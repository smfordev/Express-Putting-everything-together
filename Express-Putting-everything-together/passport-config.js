const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./user');

function initialise(passport) {
    const authenticateUser = async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if(!user)
                return done(null, false, { message: 'Username or password ' 
                + 'Incorrect' });
            if(await bcrypt.compare(password, user.password))
                return done(null, user);
            return done(null, false, { message: 'Username or password ' 
            + 'Incorrect' });
        } catch (e) {
            return done(e);
        }
    };
    passport.use(new LocalStrategy({usernameField: 'username'},
    authenticateUser));
    passport.serializeUser((user, done) => {
        done(null, user._id);
      });
    
    passport.deserializeUser(async (id, done) => {
        try {
          const user = await User.findById(id);
          done(null, user);
        } catch (e) {
          done(e);
        }
      });
}

module.exports = initialise;