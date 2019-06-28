import passport from 'passport';
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
} from 'passport-jwt';
import { AuthService } from './auth.service';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
};

passport.use(
  new JwtStrategy(
    opts,
    // tslint:disable-next-line:ban-types
    async (payload: { mail_client: string }, done: Function) => {
      try {
        const client = await AuthService.getInstance().validateClient(payload);
        if (client) {
          return done(null, client);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      } catch (e) {
        return done(e, false);
      }
    },
  ),
);
