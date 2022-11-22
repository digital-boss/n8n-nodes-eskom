import {
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export interface IEskomApiCredentials {
	url: string;
	token: string;
	testingMode: boolean;
}

export class EskomApi implements ICredentialType {
	name = 'eskomApi';
	displayName = 'Eskom API';
	documentationUrl = 'eskom';
	properties: INodeProperties[] = [
		{
			displayName: 'URL',
			name: 'url',
			type: 'string',
			default: 'https://developer.sepush.co.za/business/2.0',
		},
		{
			displayName: 'Access Token',
			name: 'token',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
		},
		{
			displayName: 'Testing Mode',
			name: 'testingMode',
			type: 'boolean',
			default: false,
		},
	];

	test: ICredentialTestRequest = {
		request: {
			headers: {
				'Content-Type': 'application/json',
				'Token': '={{$credentials.token}}'
			},
			method: 'GET',
			json: true,
			baseURL: '={{$credentials.url}}',
			url: 'api_allowance',
		},
	};
}
