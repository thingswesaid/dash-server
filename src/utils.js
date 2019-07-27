const fetch = require('node-fetch');
const promoCodes = require('voucher-code-generator');
const sgMail = require('@sendgrid/mail');

const { 
  PROMO_BUY1GET1,
  EMAIL_SENDER, 
  EMAIL_PROMO_TEMPLATE,
  EMAIL_PSW_RESET_TEMPLATE,
} = require('./constants');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sort = function sort(array) {
  return array.sort(function (a, b) {
    const typeA = a.toUpperCase();
    const typeB = b.toUpperCase();
    return typeA < typeB ? -1 : typeA > typeB ? 1 : 0;
  });
};

const shuffle = function shuffle(startArray) {
  const array = startArray || [];
  for (let i = array.length - 1; i > 0; i -= 1) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [array[j], array[i]];
    array[i] = _ref[0];
    array[j] = _ref[1];
  }
  return array.slice(0, 12);
};

const isVideoActive = function(video) {
  const now = new Date();
  const activeDate = new Date(video.publishDate);
  return now >= activeDate;
}

const hasActivePromo = function(sitePromos) {
  const promos = sitePromos.filter(({ startDate, endDate }) => {
    const now = new Date();
    const from = new Date(startDate);
    const to = new Date(endDate);
    return from < now && now < to;
  });
  return promos[0];
}

const addUserToEmailList = async (firstName, lastName, email) => {
  await fetch('https://api.sendgrid.com/v3/contactdb/recipients', {
    method: 'post',
    body: JSON.stringify([
      { 
        first_name: firstName, 
        last_name: lastName, 
        email 
      }
    ]),
    headers: { 'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}` },
  })
}

const handlePromo = async (context, type, email, name) => {
  const sitePromos = await context.prisma.sitePromoes({ where: { type } });
  const activePromo = hasActivePromo(sitePromos);
  
  if (activePromo) { 
    const { promoOffer } = activePromo;
    if (promoOffer === PROMO_BUY1GET1) {
      const generatedCodes = promoCodes.generate({ 
        length: 5, 
        charset: promoCodes.charset("alphabetic") 
      })

      const code = generatedCodes[0].toLowerCase();
      const now = new Date();
      const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      endDate.setHours(23,59,59,999);
      const promoCode = await context.prisma.createPromoCode({
        code, endDate, type, user: { connect: { email } }
      });

      if (process.env.NODE_ENV === 'production') {
        const msg = {
          to: email,
          from: EMAIL_SENDER,
          templateId: EMAIL_PROMO_TEMPLATE,
          dynamic_template_data: {
            name,
            code: code.toUpperCase(),
          },
        };
        sgMail.send(msg); 
      }
      return promoCode;
    }
  }
  return null;
}

sendPasswordReset = (email, url) => {
  const msg = {
    to: email,
    from: EMAIL_SENDER,
    templateId: EMAIL_PSW_RESET_TEMPLATE,
    dynamic_template_data: { url },
  };
  sgMail.send(msg); 
}

module.exports = { 
  sort, 
  shuffle,
  isVideoActive,
  hasActivePromo, 
  addUserToEmailList, 
  handlePromo,
  sendPasswordReset,
};