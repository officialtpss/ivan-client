import axios from 'axios';

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/`,
    timeout: 10000,
});

// Step-2: Create request, response & error handlers
const requestHandler = request => request;

const responseHandler = response => response;

const errorHandler = error => Promise.reject(error);

// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
instance.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

instance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
 );

export default instance;