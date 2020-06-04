const baseUrl =
    process.env.NODE_ENV === "production"
        ? 'https://emarh-e-commerce-react-reserve.herokuapp.com'
        : 'http://localhost:3000';

export default baseUrl;
