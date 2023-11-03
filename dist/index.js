"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpointEnum = void 0;
const pino_abstract_transport_1 = __importDefault(require("pino-abstract-transport"));
exports.endpointEnum = {
    eu: 'https://log-api.eu.newrelic.com/log/v1',
    us: 'https://log-api.newrelic.com/log/v1',
    fedRAMP: 'https://gov-log-api.newrelic.com/log/v1',
};
function newRelicTransport({ licenseKey, endpoint, headerLessAuth = false, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = licenseKey !== null && licenseKey !== void 0 ? licenseKey : process.env.NEW_RELIC_LICENSE_KEY;
        if (!apiKey) {
            throw new Error('License key must be provided as licenseKey option or in process.env.NEW_RELIC_LICENSE_KEY');
        }
        const endpointUrl = new URL(endpoint);
        const headers = {
            'content-type': 'application/json',
        };
        if (headerLessAuth) {
            endpointUrl.searchParams.set('Api-Key', apiKey);
        }
        else {
            headers['api-key'] = apiKey;
        }
        return (0, pino_abstract_transport_1.default)((source) => { var _a, source_1, source_1_1; return __awaiter(this, void 0, void 0, function* () {
            var _b, e_1, _c, _d;
            try {
                for (_a = true, source_1 = __asyncValues(source); source_1_1 = yield source_1.next(), _b = source_1_1.done, !_b; _a = true) {
                    _d = source_1_1.value;
                    _a = false;
                    const obj = _d;
                    try {
                        yield fetch(endpoint, {
                            body: JSON.stringify(obj),
                            headers,
                            method: 'POST',
                        });
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_a && !_b && (_c = source_1.return)) yield _c.call(source_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }); });
    });
}
exports.default = newRelicTransport;
//# sourceMappingURL=index.js.map