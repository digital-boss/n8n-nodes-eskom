import { IExecuteFunctions, IHttpRequestOptions, NodeApiError } from 'n8n-workflow';
import { StateBase } from '@digital-boss/n8n-designpatterns/dist';
import merge from 'lodash.merge';
import { IEskomApiCredentials } from 'credentials/EskomApi.credentials';
export class State extends StateBase {

	constructor (
		public execFns: IExecuteFunctions,
		public creds: IEskomApiCredentials,
	) {
		super(execFns);
	}

	simplify = (map?: string) => (res: any) => {
		const simplify = this.execFns.getNode().parameters.simplify && this.getParam('simplify');
		if (map && simplify) {
			if (res) {
				return map.split('.').reduce((acc, i) => acc[i], res);
			} else {
				throw new NodeApiError(this.execFns.getNode(), res, { message: `Error in strip: ${res.errMsg}` });
			}
		}
		return res;
	}

	buildRequest (): IHttpRequestOptions {
		const op = this.getParam('operation');
		const opts: IHttpRequestOptions = {
			baseURL: this.creds.url,
			url: op,
			headers: {
				'Content-Type': 'application/json',
				'Token': this.creds.token
			},
			method: 'GET',
			json: true,
			qs: this.getParamsForRequest()
		}

		return opts;
	}

	getParamsForRequest () {
		const special = ['operation', 'simplify', 'optionalParams'];
		const params = Object.entries(this.getAllParams()).filter(i => !special.includes(i[0]));
		return merge(Object.fromEntries(params), this.tryGetParam('optionalParams'));
	}

}
