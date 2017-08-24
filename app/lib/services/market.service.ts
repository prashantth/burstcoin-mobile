import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Currency, HttpError } from "../model";

@Injectable()
export class MarketService {

    constructor(private http: Http) {

    }

    /*
    * Get Currency Data from coinmarketcap
    * TODO Provide interface, for easy swap of currency data provider
    */
    public getCurrency(currency = undefined): Promise<Currency> {
            let query: string = ""
            if (currency != undefined) {
                currency = currency.toLowerCase();
                query = "?convert=" + currency;
            }
            return this.http.get("https://api.coinmarketcap.com/v1/ticker/burst" + query, this.getRequestOptions())
                .toPromise()
                .then(response => {
                    console.log("dqw12");
                    let c = response.json() || {};
                    // set currency for currency object
                    c["currency"] = currency;
                    return new Currency(c);
                })
                .catch(this.handleError);
    }

    /*
    * Helper Method to generate Request options
    */
    public getRequestOptions() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return options;
    }

    private handleError(error: Response | any) {
        return Promise.reject(new HttpError(error.json()));
    }

}