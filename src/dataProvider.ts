import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://localhost:3000/admin';
const httpClient = fetchUtils.fetchJson;

const getTotal = (headers: Headers): number => {
    if (headers) {
        const total: string = headers.get('x-total-count') || '';
        
        return parseInt(total);
    }
    return 0;
};

export const dataProvider = {
    getList: (resource: string, params: any) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ headers, json }) => ({
            data: json ? json : [],
            total: getTotal(headers) || 10,
        }));
    },

    getOne: (resource: string, params: any) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource: string, params: any) => {
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json ? json : [] }));
    },

    getManyReference: (resource: string, params: any) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json ? json : [],
            total: getTotal(headers) || 10,
        }));
    },

    update: async (resource: string, params: any) => {
        params.data = await processDataWithImage(resource, params);

        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    updateMany: (resource: string, params: any) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}/update-many?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: async (resource: string, params: any) => {
        params.data = await processDataWithImage(resource, params);

        return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        }));
    },

    delete: (resource: string, params: any) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource: string, params: any) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}/delete-many?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
};

const processDataWithImage = async (resource: string, params: any) => {
    if (params.data.images) {
        let images = params.data.images;
        if (!images.length) {
            images = [images];
        }
        /**
         * For posts update only, convert uploaded image in base 64 and attach it to
         * the `image` sent property, with `src` and `title` attributes.
         */
    
        // Freshly dropped images are File objects and must be converted to base64 strings
        const newImages = images.filter(
            (i: any) => i.rawFile instanceof File
        );
        const formerImages = images.filter(
            (i: any) => !(i.rawFile instanceof File)
        );
        const base64Images = await Promise.all(newImages.map(convertFileToBase64));
        const transformedNewImages = base64Images.map((image64: any) => ({
            src: image64,
            title: '',
        }));
        params.data = {
            ...params.data,
            images: [
                ...transformedNewImages,
                ...formerImages,
            ]
        };
    }
    return params.data;
}

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file.rawFile);
    });
}


