import HomePage from '../views/pages/home/home-page';
import GuestPage from '../views/pages/guest/guest-page'; 
import StoryDetailPage from '../views/pages/user/story-detail-page';
import AddStoryPage from '../views/pages/user/cek-hoax-page';
import LoginPage from '../views/pages/auth/login-page';
import RegisterPage from '../views/pages/auth/register-page';
import AddGuestStoryPage from '../views/pages/guest/cek-hoax-guest-page'; 
import NotFoundPage from '../views/pages/not-found-page';
import AboutPage from '../views/pages/about/about-page';
import FAQPage from '../views/pages/FAQ/faq-page';

const routes = {
  '/': new HomePage(),
  '/home': new HomePage(),
  '/guest': new GuestPage(), 
  '/stories/:id': new StoryDetailPage(),
  '/cek-hoax': new AddStoryPage(),
  '/login': new LoginPage(),
  '/register': new RegisterPage(),
  '/add-guest-story': new AddGuestStoryPage(),
  '/about': new AboutPage(),
  '/faq': new FAQPage(),
  '*': new NotFoundPage(),
};

export default routes;