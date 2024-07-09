import { DataProvider, fetchUtils, RaRecord, Identifier } from 'react-admin';
import axios from 'axios';

const apiUrl = 'http://10.52.38.215:3001/api'; // Replace with your API URL

const httpClient = fetchUtils.fetchJson;

export const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        const { page = 1, perPage = 10 } = params.pagination || {};
        const { field = 'id', order = 'ASC' } = params.sort || {};

        const query = {
            page: String(page),
            limit: String(perPage),
        };

        const url = `${apiUrl}/${resource}?${new URLSearchParams(query).toString()}`;

        try {
            const response = await axios.get(url);
            const data = response.data.results || response.data;

            // console.log(data);
            return {
                data: data.map((item: any) => ({ ...item, id: item.shoe_id })), // Adjust this to match your primary key
                total: response.data.totalCount || data.length,
            };
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching data');
        }
    },

    getOne: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        try {
            const response = await axios.get(url);
            console.log(response.data);
            return { data: {...response.data, id: response.data.shoe_id } };
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching data');
        }
    },

    getMany: async (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${new URLSearchParams(query).toString()}`;
        try {
            const response = await axios.get(url);
            return { data: response.data.map((item:any) => ({...item, id: item.shoe_id}))  };
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching data');
        }
    },

    getManyReference: async (resource, params) => {
        const { page = 1, perPage = 10 } = params.pagination || {};
        const { field = 'id', order = 'ASC' } = params.sort || {};
        const { id, target } = params;

        const query = {
            page: String(page),
            limit: String(perPage),
            sort: `${field}:${order}`,
            filter: JSON.stringify({ [target]: id, ...params.filter }),
        };

        const url = `${apiUrl}/${resource}?${new URLSearchParams(query).toString()}`;
        try {
            const response = await axios.get(url);
            return {
                data: response.data.results || response.data,
                total: response.data.totalCount || response.data.length,
            };
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching data');
        }
    },

    update: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        try {
            const response = await axios.put(url, params.data);
            return { data: response.data };
        } catch (error) {
            console.error(error);
            throw new Error('Error updating data');
        }
    },

    updateMany: async (resource, params) => {
        try {
            const responses = await Promise.all(
                params.ids.map(id => axios.put(`${apiUrl}/${resource}/${id}`, params.data))
            );
            return { data: responses.map(response => response.data.id) };
        } catch (error) {
            console.error(error);
            throw new Error('Error updating data');
        }
    },

    create: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        try {
            const response = await axios.post(url, params.data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error('Error creating data');
        }
    },

    delete: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        try {
            const response = await axios.delete(url);
            return { data: response.data };
        } catch (error) {
            console.error(error);
            throw new Error('Error deleting data');
        }
    },

    deleteMany: async (resource, params) => {
        try {
            const responses = await Promise.all(
                params.ids.map(id => axios.delete(`${apiUrl}/${resource}/${id}`))
            );
            return { data: responses.map(response => response.data.id) };
        } catch (error) {
            console.error(error);
            throw new Error('Error deleting data');
        }
    },
};

// export default dataProvider;

