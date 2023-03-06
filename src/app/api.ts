import store from './store';
export const fetchWrapper = {
	get,
	post,
	formPost,
	put,
	delete: _delete,
};

// export const API_URL = 'http://localhost:3090';
export const API_URL = process.env.REACT_APP_API_ENDPOINT;

async function get<Data = any>(url: string) {
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${store.getState().auth.token}`,
			'UserLocale': localStorage.getItem("i18nextLng") ?? 'en'
		},
	};
	const response = await fetch(url, requestOptions);
	return handleResponse<Data>(response);
}

async function post<Data = any>(url: string, body: Record<any, any>) {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${store.getState().auth.token}`,
			'UserLocale': localStorage.getItem("i18nextLng") ?? 'en'
		},
		body: JSON.stringify(body),
	};
	const response = await fetch(url, requestOptions);
	return handleResponse<Data>(response);
}

async function formPost<Data = any>(url: string, formData: FormData) {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${store.getState().auth.token}`,
			'UserLocale': localStorage.getItem("i18nextLng") ?? 'en'
		},
		body: formData,
	};
	const response = await fetch(url, requestOptions);
	return handleResponse<Data>(response);
}


async function put<Data = any>(url: string, body: Record<any, any>) {
	const requestOptions = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${store.getState().auth.token}`,
			'UserLocale': localStorage.getItem("i18nextLng") ?? 'en'
		},
		body: JSON.stringify(body),
	};

	const response = await fetch(url, requestOptions);
	return handleResponse<Data>(response);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete<Data = any>(url: string) {
	const requestOptions = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${store.getState().auth.token}`,
			'UserLocale': localStorage.getItem("i18nextLng") ?? 'en'
		},
	};

	const response = await fetch(url, requestOptions);
	return handleResponse<Data>(response);
}

// helper functions

async function handleResponse<Data = any>(response: Response): Promise<Data> {
	const text = await response.text();
	const data = text && JSON.parse(text);

	if (response.status == 401) {
		window.location.href = "/"
	}

	if (!response.ok) {
		const error = (data && data.message) || response.statusText;
		return Promise.reject(error);
	}
	return data;
}
