import { Util } from "../../../misc/util/helpers/util";
var SearchService = /** @class */ (function () {
    function SearchService(allowEmptyQuery) {
        var _this = this;
        if (allowEmptyQuery === void 0) { allowEmptyQuery = false; }
        this._options = [];
        this.optionsFilter = function (os, q) {
            // Convert the query string to a RegExp.
            var regex = _this.toRegex(_this._query);
            if (regex instanceof RegExp) {
                // Only update the results if the query was valid regex.
                // This avoids the results suddenly becoming empty if an invalid regex string is inputted.
                return (os
                    // Filter on the options with a string match on the field we are testing.
                    .filter(function (o) {
                    return Util.Object.readValue(o, _this._optionsField)
                        .toString()
                        .match(regex);
                }));
            }
            // Don't update since it wasn't a valid regex.
            return false;
        };
        // Set default values and reset.
        this.allowEmptyQuery = allowEmptyQuery;
        this.searchDelay = 0;
        this.reset();
    }
    Object.defineProperty(SearchService.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (options) {
            this._options = options || [];
            // We cannot use both local & remote options simultaneously.
            this._optionsLookup = undefined;
            // Reset entire service with new options.
            this.reset();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "optionsLookup", {
        get: function () {
            return this._optionsLookup;
        },
        set: function (lookupFn) {
            this._optionsLookup = lookupFn;
            // As before, cannot use local & remote options simultaneously.
            this._options = [];
            this.reset();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "hasItemLookup", {
        get: function () {
            return !!this.optionsLookup && this.optionsLookup.length === 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "optionsField", {
        get: function () {
            return this._optionsField;
        },
        set: function (field) {
            this._optionsField = field;
            // We need to reset otherwise we would now be showing invalid search results.
            this.reset();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "results", {
        get: function () {
            return this._results;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "query", {
        get: function () {
            return this._query;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "isSearching", {
        get: function () {
            return this._isSearching;
        },
        enumerable: true,
        configurable: true
    });
    // Updates the query after the specified search delay.
    SearchService.prototype.updateQueryDelayed = function (query, callback) {
        var _this = this;
        if (callback === void 0) { callback = function () { }; }
        this._query = query;
        clearTimeout(this._searchDelayTimeout);
        this._searchDelayTimeout = window.setTimeout(function () {
            _this.updateQuery(query, callback);
        }, this.searchDelay);
    };
    // Updates the current search query.
    SearchService.prototype.updateQuery = function (query, callback) {
        var _this = this;
        if (callback === void 0) { callback = function () { }; }
        this._query = query;
        if (this._query === "" && !this.allowEmptyQuery) {
            // Don't update if the new query is empty (and we don't allow empty queries).
            // Don't reset so that when animating closed we don't get a judder.
            return callback();
        }
        if (this._resultsCache.hasOwnProperty(this._query)) {
            // If the query is already cached, make use of it.
            this._results = this._resultsCache[this._query];
            return callback();
        }
        if (this._optionsLookup) {
            this._isSearching = true;
            // Call the options lookup without a this context.
            var queryLookup = this._optionsLookup.call(undefined, this._query);
            queryLookup
                .then(function (results) {
                _this._isSearching = false;
                _this.updateResults(results);
                return callback();
            })
                .catch(function (error) {
                // Unset 'loading' state, and throw the returned error without updating the results.
                _this._isSearching = false;
                return callback(error);
            });
            return;
        }
        var filtered = this.optionsFilter.call(undefined, this._options, this._query);
        if (filtered) {
            this.updateResults(filtered);
        }
        return callback();
    };
    // Updates & caches the new set of results.
    SearchService.prototype.updateResults = function (results) {
        this._resultsCache[this._query] = results;
        this._results = results;
    };
    // tslint:disable-next-line:promise-function-async
    SearchService.prototype.initialLookup = function (initial) {
        if (initial instanceof Array) {
            return this._optionsLookup(undefined, initial);
        }
        return this._optionsLookup(undefined, initial);
    };
    // Converts a query string to regex without throwing an error.
    SearchService.prototype.toRegex = function (query) {
        try {
            return new RegExp(query, "i");
        }
        catch (e) {
            return query;
        }
    };
    // Generates HTML for highlighted match text.
    SearchService.prototype.highlightMatches = function (text, query) {
        var regex = this.toRegex(query);
        if (regex instanceof RegExp) {
            return text.replace(regex, function (match) { return "<b>" + match + "</b>"; });
        }
        return text;
    };
    // Resets the search back to a pristine state.
    SearchService.prototype.reset = function () {
        this._results = [];
        this._resultsCache = {};
        this._isSearching = false;
        this.updateQuery("");
    };
    return SearchService;
}());
export { SearchService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL3NlYXJjaC9zZXJ2aWNlcy9zZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFNdkQ7SUEwRUksdUJBQVksZUFBK0I7UUFBM0MsaUJBK0JDO1FBL0JXLGdDQUFBLEVBQUEsdUJBQStCO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBQyxFQUFFLEVBQUUsQ0FBQztZQUN2Qix3Q0FBd0M7WUFDeEMsSUFBTSxLQUFLLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFeEMsSUFBSSxLQUFLLFlBQVksTUFBTSxFQUFFO2dCQUN6Qix3REFBd0Q7Z0JBQ3hELDBGQUEwRjtnQkFDMUYsT0FBTyxDQUNILEVBQUU7b0JBQ0UseUVBQXlFO3FCQUN4RSxNQUFNLENBQUMsVUFBQSxDQUFDO29CQUNMLE9BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQ2pCLENBQUMsRUFDRCxLQUFJLENBQUMsYUFBYSxDQUNyQjt5QkFDSSxRQUFRLEVBQUU7eUJBQ1YsS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFMakIsQ0FLaUIsQ0FDcEIsQ0FDUixDQUFDO2FBQ0w7WUFFRCw4Q0FBOEM7WUFDOUMsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQyxDQUFDO1FBRUYsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBL0ZELHNCQUFXLGtDQUFPO2FBQWxCO1lBQ0ksT0FBTyxJ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Q0FDVyxDQUFDO0lBQzNCLENBQUM7SUFFRCw4REFBOEQ7SUFDdEQsK0JBQU8sR0FBZixVQUFnQixLQUFZO1FBQ3hCLElBQUk7WUFDQSxPQUFPLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNqQztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBRUQsNkNBQTZDO0lBQ3RDLHdDQUFnQixHQUF2QixVQUF3QixJQUFXLEVBQUUsS0FBWTtRQUM3QyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLElBQUksS0FBSyxZQUFZLE1BQU0sRUFBRTtZQUN6QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQUEsS0FBSyxJQUFJLE9BQUEsUUFBTSxLQUFLLFNBQU0sRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELDhDQUE4QztJQUN0Qyw2QkFBSyxHQUFiO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBbk9ELElBbU9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9va3VwRm4sIExvb2t1cEZuUmVzdWx0LCBGaWx0ZXJGbiB9IGZyb20gXCIuLi9oZWxwZXJzL2xvb2t1cC1mblwiO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaGVscGVycy91dGlsXCI7XG5cbmludGVyZmFjZSBJQ2FjaGVkQXJyYXk8VD4ge1xuICAgIFtxdWVyeTpzdHJpbmddOlRbXTtcbn1cblxuZXhwb3J0IGNsYXNzIFNlYXJjaFNlcnZpY2U8VCwgVT4ge1xuICAgIC8vIFN0b3JlcyB0aGUgYXZhaWxhYmxlIG9wdGlvbnMuXG4gICAgcHJpdmF0ZSBfb3B0aW9uczpUW107XG4gICAgLy8gQ29udmVydHMgYSBxdWVyeSBzdHJpbmcgaW50byBhbiBhcnJheSBvZiBvcHRpb25zLiBNdXN0IGJlIGEgZnVuY3Rpb24gcmV0dXJuaW5nIGEgcHJvbWlzZS5cbiAgICBwcml2YXRlIF9vcHRpb25zTG9va3VwPzpMb29rdXBGbjxULCBVPjtcbiAgICAvLyBGaWVsZCB0aGF0IG9wdGlvbnMgYXJlIHNlYXJjaGVkICYgZGlzcGxheWVkIG9uLlxuICAgIHByaXZhdGUgX29wdGlvbnNGaWVsZD86c3RyaW5nO1xuICAgIC8vIEZpbHRlcnMgYSBsaXN0IG9mIG9wdGlvbnMuXG4gICAgcHVibGljIG9wdGlvbnNGaWx0ZXI6RmlsdGVyRm48VD47XG5cbiAgICBwdWJsaWMgZ2V0IG9wdGlvbnMoKTpUW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IG9wdGlvbnMob3B0aW9uczpUW10pIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnMgfHwgW107XG4gICAgICAgIC8vIFdlIGNhbm5vdCB1c2UgYm90aCBsb2NhbCAmIHJlbW90ZSBvcHRpb25zIHNpbXVsdGFuZW91c2x5LlxuICAgICAgICB0aGlzLl9vcHRpb25zTG9va3VwID0gdW5kZWZpbmVkO1xuICAgICAgICAvLyBSZXNldCBlbnRpcmUgc2VydmljZSB3aXRoIG5ldyBvcHRpb25zLlxuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBvcHRpb25zTG9va3VwKCk6TG9va3VwRm48VCwgVT4gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9uc0xvb2t1cDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IG9wdGlvbnNMb29rdXAobG9va3VwRm46TG9va3VwRm48VCwgVT4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9uc0xvb2t1cCA9IGxvb2t1cEZuO1xuICAgICAgICAvLyBBcyBiZWZvcmUsIGNhbm5vdCB1c2UgbG9jYWwgJiByZW1vdGUgb3B0aW9ucyBzaW11bHRhbmVvdXNseS5cbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBoYXNJdGVtTG9va3VwKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMub3B0aW9uc0xvb2t1cCAmJiB0aGlzLm9wdGlvbnNMb29rdXAubGVuZ3RoID09PSAyO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgb3B0aW9uc0ZpZWxkKCk6c3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnNGaWVsZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IG9wdGlvbnNGaWVsZChmaWVsZDpzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9uc0ZpZWxkID0gZmllbGQ7XG4gICAgICAgIC8vIFdlIG5lZWQgdG8gcmVzZXQgb3RoZXJ3aXNlIHdlIHdvdWxkIG5vdyBiZSBzaG93aW5nIGludmFsaWQgc2VhcmNoIHJlc3VsdHMuXG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG5cbiAgICAvLyBTdG9yZXMgdGhlIHJlc3VsdHMgb2YgdGhlIHF1ZXJ5LlxuICAgIHByaXZhdGUgX3Jlc3VsdHM6VFtdO1xuICAgIC8vIENhY2hlIG9mIHJlc3VsdHMsIGluZGV4ZWQgYnkgcXVlcnkuXG4gICAgcHJpdmF0ZSBfcmVzdWx0c0NhY2hlOklDYWNoZWRBcnJheTxUPjtcblxuICAgIHB1YmxpYyBnZXQgcmVzdWx0cygpOlRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXN1bHRzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3F1ZXJ5OnN0cmluZztcbiAgICAvLyBBbGxvd3MgdGhlIGVtcHR5IHF1ZXJ5IHRvIHByb2R1Y2UgcmVzdWx0cy5cbiAgICBwdWJsaWMgYWxsb3dFbXB0eVF1ZXJ5OmJvb2xlYW47XG4gICAgLy8gSG93IGxvbmcgdG8gZGVsYXkgdGhlIHNlYXJjaCBmb3Igd2hlbiB1c2luZyB1cGRhdGVRdWVyeURlbGF5ZWQuIFN0b3JlZCBpbiBtcy5cbiAgICBwdWJsaWMgc2VhcmNoRGVsYXk6bnVtYmVyO1xuICAgIC8vIFN0b3JlcyB0aGUgc2VhcmNoIHRpbWVvdXQgaGFuZGxlIHNvIHdlIGNhbiBjYW5jZWwgaXQuXG4gICAgcHJpdmF0ZSBfc2VhcmNoRGVsYXlUaW1lb3V0Om51bWJlcjtcbiAgICAvLyBQcm92aWRlcyAnbG9hZGluZycgZnVuY3Rpb25hbGl0eS5cbiAgICBwcml2YXRlIF9pc1NlYXJjaGluZzpib29sZWFuO1xuXG4gICAgcHVibGljIGdldCBxdWVyeSgpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVyeTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzU2VhcmNoaW5nKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1NlYXJjaGluZztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihhbGxvd0VtcHR5UXVlcnk6Ym9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5vcHRpb25zRmlsdGVyID0gKG9zLCBxKSA9PiB7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBxdWVyeSBzdHJpbmcgdG8gYSBSZWdFeHAuXG4gICAgICAgICAgICBjb25zdCByZWdleCA9IHRoaXMudG9SZWdleCh0aGlzLl9xdWVyeSk7XG5cbiAgICAgICAgICAgIGlmIChyZWdleCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgICAgIC8vIE9ubHkgdXBkYXRlIHRoZSByZXN1bHRzIGlmIHRoZSBxdWVyeSB3YXMgdmFsaWQgcmVnZXguXG4gICAgICAgICAgICAgICAgLy8gVGhpcyBhdm9pZHMgdGhlIHJlc3VsdHMgc3VkZGVubHkgYmVjb21pbmcgZW1wdHkgaWYgYW4gaW52YWxpZCByZWdleCBzdHJpbmcgaXMgaW5wdXR0ZWQuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgb3NcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpbHRlciBvbiB0aGUgb3B0aW9ucyB3aXRoIGEgc3RyaW5nIG1hdGNoIG9uIHRoZSBmaWVsZCB3ZSBhcmUgdGVzdGluZy5cbiAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIobyA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFV0aWwuT2JqZWN0LnJlYWRWYWx1ZTxULCBzdHJpbmc+KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zRmllbGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChyZWdleClcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBEb24ndCB1cGRhdGUgc2luY2UgaXQgd2Fzbid0IGEgdmFsaWQgcmVnZXguXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU2V0IGRlZmF1bHQgdmFsdWVzIGFuZCByZXNldC5cbiAgICAgICAgdGhpcy5hbGxvd0VtcHR5UXVlcnkgPSBhbGxvd0VtcHR5UXVlcnk7XG4gICAgICAgIHRoaXMuc2VhcmNoRGVsYXkgPSAwO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlcyB0aGUgcXVlcnkgYWZ0ZXIgdGhlIHNwZWNpZmllZCBzZWFyY2ggZGVsYXkuXG4gICAgcHVibGljIHVwZGF0ZVF1ZXJ5RGVsYXllZChcbiAgICAgICAgcXVlcnk6c3RyaW5nLFxuICAgICAgICBjYWxsYmFjazooZXJyPzpFcnJvcikgPT4gdm9pZCA9ICgpID0+IHt9XG4gICAgKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fcXVlcnkgPSBxdWVyeTtcblxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fc2VhcmNoRGVsYXlUaW1lb3V0KTtcbiAgICAgICAgdGhpcy5fc2VhcmNoRGVsYXlUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVRdWVyeShxdWVyeSwgY2FsbGJhY2spO1xuICAgICAgICB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaERlbGF5KTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGVzIHRoZSBjdXJyZW50IHNlYXJjaCBxdWVyeS5cbiAgICBwdWJsaWMgdXBkYXRlUXVlcnkoXG4gICAgICAgIHF1ZXJ5OnN0cmluZyxcbiAgICAgICAgY2FsbGJhY2s6KGVycj86RXJyb3IpID0+IHZvaWQgPSAoKSA9PiB7fVxuICAgICk6dm9pZCB7XG4gICAgICAgIHRoaXMuX3F1ZXJ5ID0gcXVlcnk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3F1ZXJ5ID09PSBcIlwiICYmICF0aGlzLmFsbG93RW1wdHlRdWVyeSkge1xuICAgICAgICAgICAgLy8gRG9uJ3QgdXBkYXRlIGlmIHRoZSBuZXcgcXVlcnkgaXMgZW1wdHkgKGFuZCB3ZSBkb24ndCBhbGxvdyBlbXB0eSBxdWVyaWVzKS5cbiAgICAgICAgICAgIC8vIERvbid0IHJlc2V0IHNvIHRoYXQgd2hlbiBhbmltYXRpbmcgY2xvc2VkIHdlIGRvbid0IGdldCBhIGp1ZGRlci5cbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3Jlc3VsdHNDYWNoZS5oYXNPd25Qcm9wZXJ0eSh0aGlzLl9xdWVyeSkpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBxdWVyeSBpcyBhbHJlYWR5IGNhY2hlZCwgbWFrZSB1c2Ugb2YgaXQuXG4gICAgICAgICAgICB0aGlzLl9yZXN1bHRzID0gdGhpcy5fcmVzdWx0c0NhY2hlW3RoaXMuX3F1ZXJ5XTtcblxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fb3B0aW9uc0xvb2t1cCkge1xuICAgICAgICAgICAgdGhpcy5faXNTZWFyY2hpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBDYWxsIHRoZSBvcHRpb25zIGxvb2t1cCB3aXRob3V0IGEgdGhpcyBjb250ZXh0LlxuICAgICAgICAgICAgY29uc3QgcXVlcnlMb29rdXAgPSB0aGlzLl9vcHRpb25zTG9va3VwLmNhbGwoXG4gICAgICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXJ5XG4gICAgICAgICAgICApIGFzIExvb2t1cEZuUmVzdWx0PFRbXT47XG5cbiAgICAgICAgICAgIHF1ZXJ5TG9va3VwXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0cyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzU2VhcmNoaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVSZXN1bHRzKHJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFVuc2V0ICdsb2FkaW5nJyBzdGF0ZSwgYW5kIHRocm93IHRoZSByZXR1cm5lZCBlcnJvciB3aXRob3V0IHVwZGF0aW5nIHRoZSByZXN1bHRzLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc1NlYXJjaGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IHRoaXMub3B0aW9uc0ZpbHRlci5jYWxsKFxuICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyxcbiAgICAgICAgICAgIHRoaXMuX3F1ZXJ5XG4gICAgICAgICk7XG4gICAgICAgIGlmIChmaWx0ZXJlZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVSZXN1bHRzKGZpbHRlcmVkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGVzICYgY2FjaGVzIHRoZSBuZXcgc2V0IG9mIHJlc3VsdHMuXG4gICAgcHJpdmF0ZSB1cGRhdGVSZXN1bHRzKHJlc3VsdHM6VFtdKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVzdWx0c0NhY2hlW3RoaXMuX3F1ZXJ5XSA9IHJlc3VsdHM7XG4gICAgICAgIHRoaXMuX3Jlc3VsdHMgPSByZXN1bHRzO1xuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcm9taXNlLWZ1bmN0aW9uLWFzeW5jXG4gICAgcHVibGljIGluaXRpYWxMb29rdXAoaW5pdGlhbDpVKTpMb29rdXBGblJlc3VsdDxUPjtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJvbWlzZS1mdW5jdGlvbi1hc3luY1xuICAgIHB1YmxpYyBpbml0aWFsTG9va3VwKGluaXRpYWw6VVtdKTpMb29rdXBGblJlc3VsdDxUW10+O1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcm9taXNlLWZ1bmN0aW9uLWFzeW5jXG4gICAgcHVibGljIGluaXRpYWxMb29rdXAoXG4gICAgICAgIGluaXRpYWw6VSB8IFVbXVxuICAgICk6TG9va3VwRm5SZXN1bHQ8VD4gfCBMb29rdXBGblJlc3VsdDxUW10+IHtcbiAgICAgICAgaWYgKGluaXRpYWwgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgcmV0dXJuICgodGhpcy5fb3B0aW9uc0xvb2t1cCBhcyB1bmtub3duKSBhcyBMb29rdXBGbjxULCBVW10+KShcbiAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgaW5pdGlhbFxuICAgICAgICAgICAgKSBhcyBMb29rdXBGblJlc3VsdDxUW10+O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodGhpcy5fb3B0aW9uc0xvb2t1cCBhcyBMb29rdXBGbjxULCBVPikoXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICBpbml0aWFsXG4gICAgICAgICkgYXMgTG9va3VwRm5SZXN1bHQ8VD47XG4gICAgfVxuXG4gICAgLy8gQ29udmVydHMgYSBxdWVyeSBzdHJpbmcgdG8gcmVnZXggd2l0aG91dCB0aHJvd2luZyBhbiBlcnJvci5cbiAgICBwcml2YXRlIHRvUmVnZXgocXVlcnk6c3RyaW5nKTpSZWdFeHAgfCBzdHJpbmcge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAocXVlcnksIFwiaVwiKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gR2VuZXJhdGVzIEhUTUwgZm9yIGhpZ2hsaWdodGVkIG1hdGNoIHRleHQuXG4gICAgcHVibGljIGhpZ2hsaWdodE1hdGNoZXModGV4dDpzdHJpbmcsIHF1ZXJ5OnN0cmluZyk6c3RyaW5nIHtcbiAgICAgICAgY29uc3QgcmVnZXggPSB0aGlzLnRvUmVnZXgocXVlcnkpO1xuICAgICAgICBpZiAocmVnZXggaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UocmVnZXgsIG1hdGNoID0+IGA8Yj4ke21hdGNofTwvYj5gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG5cbiAgICAvLyBSZXNldHMgdGhlIHNlYXJjaCBiYWNrIHRvIGEgcHJpc3RpbmUgc3RhdGUuXG4gICAgcHJpdmF0ZSByZXNldCgpOnZvaWQge1xuICAgICAgICB0aGlzLl9yZXN1bHRzID0gW107XG4gICAgICAgIHRoaXMuX3Jlc3VsdHNDYWNoZSA9IHt9O1xuICAgICAgICB0aGlzLl9pc1NlYXJjaGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVwZGF0ZVF1ZXJ5KFwiXCIpO1xuICAgIH1cbn1cbiJdfQ==