import axios from 'axios';

const baseURL: string = 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL,
});

interface currentStateHelperType {
  actionList: string[];
  creditList: Record<string, number>;
}
/**
 * Perform get on status
 */
const currentStateHelper = async (): Promise<currentStateHelperType> => {
  const response = await axiosInstance.get('/currentState');
  return response.data;
};

const pushActionHelper = async (action: string) => {
  const response = await axiosInstance.put('/pushAction', {
    action,
  });
  return response.data.message;
};

export { currentStateHelper, pushActionHelper };
