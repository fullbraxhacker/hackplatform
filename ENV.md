Here are working environment variables for all of the services we use in the Junction App. These environment variables are connected to sandbox accounts, which can be used while developing the platform. The accounts used in production are entirely separate, and should not be used in development, as a general rule of thumb.

### Frontend environment variables

Put these environment variables in `./frontend/.env` - you'll need to create the file as it is ignored from Git.

```
### Required values
PORT=3000
REACT_APP_BASE_URL=http://localhost:3000
REACT_APP_IS_DEBUG=True
REACT_APP_AUTH0_DOMAIN=hackjunction-dev.eu.auth0.com
REACT_APP_AUTH0_CLIENT_ID=cGjPXy4hjLz6qfKQrK0Ot3IbonxUWJVi
REACT_APP_CLOUDINARY_CLOUD_NAME=hackjunction-dev

### Extra values
REACT_APP_FACEBOOK_PIXEL_ID=1999365573713460
REACT_APP_LOGROCKET_ID=ja746e/junction-app-production
REACT_APP_HOTJAR_ID=1179129
REACT_APP_HOTJAR_SV=6

### Customization values
REACT_APP_PAGE_TITLE=LOCAL Junkkari
REACT_APP_SEO_PAGE_TITLE<=LOCAL Junkkari
REACT_APP_SEO_PAGE_DESCRIPTION=Junkkari on tällänen
REACT_APP_SEO_IMAGE_URL=https://images.wisegeek.com/url-address.jpg
REACT_APP_SEO_TWITTER_HANDLE=@visathebean

### Production values
REACT_APP_API_BASE_URL=https://cms.www.hackjunction.com
REACT_APP_MAPBOX_TOKEN=pk.eyJ1IjoiaGFja2p1bmN0aW9uIiwiYSI6ImNqdnFqaGtsMjI1ZWM0Ym9mZGg1cTNrODgifQ.opDfJH_G3cznE63MLRQ9ww
```
