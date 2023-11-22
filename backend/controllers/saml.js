const fs = require("fs");
const dotenv = require("dotenv");

const SamlStrategy = require("passport-saml").Strategy;

const debug = require('debug')('passport-saml')
const passport = require("passport");
dotenv.config();

const publicCert = fs.readFileSync(process.env.SAMLCERT, 'utf-8');
const privateKey = fs.readFileSync(process.env.SAMLKEY, 'utf-8');
const idpCert = fs.readFileSync(process.env.IDPCERT, 'utf-8');

const winston = require('winston');
const { MultiSamlStrategy } = require("passport-saml");

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console()
  ]
});

let target = "https://modulmanager.ldv.ei.tum.de/shibboleth"

let entryPoint = "https://login.tum.de/idp/profile/SAML2/Redirect/SSO";

let strategy = new SamlStrategy({
  passReqToCallback: true,
  callbackUrl: "https://modulmanager.ldv.ei.tum.de/api/auth/Shibboleth.sso/SAML2/POST",
  entryPoint: "https://login.tum.de/idp/profile/SAML2/Redirect/SSO",
  issuer: target,
  path: "/api/auth/Shibboleth.sso/SAML2/POST",
  identifierFormat: "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
  validateInResponseTo: true,
  disableRequestedAuthnContext: true,
  authnContext: true,
  privateKey,
  decryptionPvk: privateKey,
  cert: idpCert
}, (req, profile, done) => {
  let user = {
    firstname: profile["urn:oid:2.5.4.42"],
    lastname: profile["urn:oid:2.5.4.4"],
    email: profile.mail,
  }
  return done(null, user);
});

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  done(null, id);
});

passport.use("saml", strategy);

module.exports = {
  passport,
  strategy
}
