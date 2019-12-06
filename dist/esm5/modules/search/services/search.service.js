import { Util } from "../../../misc/util/index";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL3NlYXJjaC9zZXJ2aWNlcy9zZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFPaEQ7SUEwRUksdUJBQVksZUFBK0I7UUFBM0MsaUJBK0JDO1FBL0JXLGdDQUFBLEVBQUEsdUJBQStCO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBQyxFQUFFLEVBQUUsQ0FBQztZQUN2Qix3Q0FBd0M7WUFDeEMsSUFBTSxLQUFLLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFeEMsSUFBSSxLQUFLLFlBQVksTUFBTSxFQUFFO2dCQUN6Qix3REFBd0Q7Z0JBQ3hELDBGQUEwRjtnQkFDMUYsT0FBTyxDQUNILEVBQUU7b0JBQ0UseUVBQXlFO3FCQUN4RSxNQUFNLENBQUMsVUFBQSxDQUFDO29CQUNMLE9BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQ2pCLENBQUMsRUFDRCxLQUFJLENBQUMsYUFBYSxDQUNyQjt5QkFDSSxRQUFRLEVBQUU7eUJBQ1YsS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFMakIsQ0FLaUIsQ0FDcEIsQ0FDUixDQUFDO2FBQ0w7WUFFRCw4Q0FBOEM7WUFDOUMsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQyxDQUFDO1FBRUYsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBL0ZELHNCQUFXLGtDQUFPO2FBQWxCO1lBQ0ksT0FBTyxJ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Q0FDVyxDQUFDO0lBQzNCLENBQUM7SUFFRCw4REFBOEQ7SUFDdEQsK0JBQU8sR0FBZixVQUFnQixLQUFZO1FBQ3hCLElBQUk7WUFDQSxPQUFPLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNqQztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBRUQsNkNBQTZDO0lBQ3RDLHdDQUFnQixHQUF2QixVQUF3QixJQUFXLEVBQUUsS0FBWTtRQUM3QyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLElBQUksS0FBSyxZQUFZLE1BQU0sRUFBRTtZQUN6QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQUEsS0FBSyxJQUFJLE9BQUEsUUFBTSxLQUFLLFNBQU0sRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELDhDQUE4QztJQUN0Qyw2QkFBSyxHQUFiO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBbk9ELElBbU9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaW5kZXhcIjtcbmltcG9ydCB7IExvb2t1cEZuLCBMb29rdXBGblJlc3VsdCwgRmlsdGVyRm4gfSBmcm9tIFwiLi4vaGVscGVycy9sb29rdXAtZm5cIjtcblxuaW50ZXJmYWNlIElDYWNoZWRBcnJheTxUPiB7XG4gICAgW3F1ZXJ5OnN0cmluZ106VFtdO1xufVxuXG5leHBvcnQgY2xhc3MgU2VhcmNoU2VydmljZTxULCBVPiB7XG4gICAgLy8gU3RvcmVzIHRoZSBhdmFpbGFibGUgb3B0aW9ucy5cbiAgICBwcml2YXRlIF9vcHRpb25zOlRbXTtcbiAgICAvLyBDb252ZXJ0cyBhIHF1ZXJ5IHN0cmluZyBpbnRvIGFuIGFycmF5IG9mIG9wdGlvbnMuIE11c3QgYmUgYSBmdW5jdGlvbiByZXR1cm5pbmcgYSBwcm9taXNlLlxuICAgIHByaXZhdGUgX29wdGlvbnNMb29rdXA/Okxvb2t1cEZuPFQsIFU+O1xuICAgIC8vIEZpZWxkIHRoYXQgb3B0aW9ucyBhcmUgc2VhcmNoZWQgJiBkaXNwbGF5ZWQgb24uXG4gICAgcHJpdmF0ZSBfb3B0aW9uc0ZpZWxkPzpzdHJpbmc7XG4gICAgLy8gRmlsdGVycyBhIGxpc3Qgb2Ygb3B0aW9ucy5cbiAgICBwdWJsaWMgb3B0aW9uc0ZpbHRlcjpGaWx0ZXJGbjxUPjtcblxuICAgIHB1YmxpYyBnZXQgb3B0aW9ucygpOlRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgb3B0aW9ucyhvcHRpb25zOlRbXSkge1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucyB8fCBbXTtcbiAgICAgICAgLy8gV2UgY2Fubm90IHVzZSBib3RoIGxvY2FsICYgcmVtb3RlIG9wdGlvbnMgc2ltdWx0YW5lb3VzbHkuXG4gICAgICAgIHRoaXMuX29wdGlvbnNMb29rdXAgPSB1bmRlZmluZWQ7XG4gICAgICAgIC8vIFJlc2V0IGVudGlyZSBzZXJ2aWNlIHdpdGggbmV3IG9wdGlvbnMuXG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG9wdGlvbnNMb29rdXAoKTpMb29rdXBGbjxULCBVPiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zTG9va3VwO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgb3B0aW9uc0xvb2t1cChsb29rdXBGbjpMb29rdXBGbjxULCBVPiB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9vcHRpb25zTG9va3VwID0gbG9va3VwRm47XG4gICAgICAgIC8vIEFzIGJlZm9yZSwgY2Fubm90IHVzZSBsb2NhbCAmIHJlbW90ZSBvcHRpb25zIHNpbXVsdGFuZW91c2x5LlxuICAgICAgICB0aGlzLl9vcHRpb25zID0gW107XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGhhc0l0ZW1Mb29rdXAoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5vcHRpb25zTG9va3VwICYmIHRoaXMub3B0aW9uc0xvb2t1cC5sZW5ndGggPT09IDI7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBvcHRpb25zRmllbGQoKTpzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9uc0ZpZWxkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgb3B0aW9uc0ZpZWxkKGZpZWxkOnN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9vcHRpb25zRmllbGQgPSBmaWVsZDtcbiAgICAgICAgLy8gV2UgbmVlZCB0byByZXNldCBvdGhlcndpc2Ugd2Ugd291bGQgbm93IGJlIHNob3dpbmcgaW52YWxpZCBzZWFyY2ggcmVzdWx0cy5cbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cblxuICAgIC8vIFN0b3JlcyB0aGUgcmVzdWx0cyBvZiB0aGUgcXVlcnkuXG4gICAgcHJpdmF0ZSBfcmVzdWx0czpUW107XG4gICAgLy8gQ2FjaGUgb2YgcmVzdWx0cywgaW5kZXhlZCBieSBxdWVyeS5cbiAgICBwcml2YXRlIF9yZXN1bHRzQ2FjaGU6SUNhY2hlZEFycmF5PFQ+O1xuXG4gICAgcHVibGljIGdldCByZXN1bHRzKCk6VFtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3VsdHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcXVlcnk6c3RyaW5nO1xuICAgIC8vIEFsbG93cyB0aGUgZW1wdHkgcXVlcnkgdG8gcHJvZHVjZSByZXN1bHRzLlxuICAgIHB1YmxpYyBhbGxvd0VtcHR5UXVlcnk6Ym9vbGVhbjtcbiAgICAvLyBIb3cgbG9uZyB0byBkZWxheSB0aGUgc2VhcmNoIGZvciB3aGVuIHVzaW5nIHVwZGF0ZVF1ZXJ5RGVsYXllZC4gU3RvcmVkIGluIG1zLlxuICAgIHB1YmxpYyBzZWFyY2hEZWxheTpudW1iZXI7XG4gICAgLy8gU3RvcmVzIHRoZSBzZWFyY2ggdGltZW91dCBoYW5kbGUgc28gd2UgY2FuIGNhbmNlbCBpdC5cbiAgICBwcml2YXRlIF9zZWFyY2hEZWxheVRpbWVvdXQ6bnVtYmVyO1xuICAgIC8vIFByb3ZpZGVzICdsb2FkaW5nJyBmdW5jdGlvbmFsaXR5LlxuICAgIHByaXZhdGUgX2lzU2VhcmNoaW5nOmJvb2xlYW47XG5cbiAgICBwdWJsaWMgZ2V0IHF1ZXJ5KCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXJ5O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaXNTZWFyY2hpbmcoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzU2VhcmNoaW5nO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGFsbG93RW1wdHlRdWVyeTpib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLm9wdGlvbnNGaWx0ZXIgPSAob3MsIHEpID0+IHtcbiAgICAgICAgICAgIC8vIENvbnZlcnQgdGhlIHF1ZXJ5IHN0cmluZyB0byBhIFJlZ0V4cC5cbiAgICAgICAgICAgIGNvbnN0IHJlZ2V4ID0gdGhpcy50b1JlZ2V4KHRoaXMuX3F1ZXJ5KTtcblxuICAgICAgICAgICAgaWYgKHJlZ2V4IGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgICAgICAgLy8gT25seSB1cGRhdGUgdGhlIHJlc3VsdHMgaWYgdGhlIHF1ZXJ5IHdhcyB2YWxpZCByZWdleC5cbiAgICAgICAgICAgICAgICAvLyBUaGlzIGF2b2lkcyB0aGUgcmVzdWx0cyBzdWRkZW5seSBiZWNvbWluZyBlbXB0eSBpZiBhbiBpbnZhbGlkIHJlZ2V4IHN0cmluZyBpcyBpbnB1dHRlZC5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICBvc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmlsdGVyIG9uIHRoZSBvcHRpb25zIHdpdGggYSBzdHJpbmcgbWF0Y2ggb24gdGhlIGZpZWxkIHdlIGFyZSB0ZXN0aW5nLlxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihvID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVXRpbC5PYmplY3QucmVhZFZhbHVlPFQsIHN0cmluZz4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnNGaWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKHJlZ2V4KVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERvbid0IHVwZGF0ZSBzaW5jZSBpdCB3YXNuJ3QgYSB2YWxpZCByZWdleC5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTZXQgZGVmYXVsdCB2YWx1ZXMgYW5kIHJlc2V0LlxuICAgICAgICB0aGlzLmFsbG93RW1wdHlRdWVyeSA9IGFsbG93RW1wdHlRdWVyeTtcbiAgICAgICAgdGhpcy5zZWFyY2hEZWxheSA9IDA7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGVzIHRoZSBxdWVyeSBhZnRlciB0aGUgc3BlY2lmaWVkIHNlYXJjaCBkZWxheS5cbiAgICBwdWJsaWMgdXBkYXRlUXVlcnlEZWxheWVkKFxuICAgICAgICBxdWVyeTpzdHJpbmcsXG4gICAgICAgIGNhbGxiYWNrOihlcnI/OkVycm9yKSA9PiB2b2lkID0gKCkgPT4ge31cbiAgICApOnZvaWQge1xuICAgICAgICB0aGlzLl9xdWVyeSA9IHF1ZXJ5O1xuXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zZWFyY2hEZWxheVRpbWVvdXQpO1xuICAgICAgICB0aGlzLl9zZWFyY2hEZWxheVRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVF1ZXJ5KHF1ZXJ5LCBjYWxsYmFjayk7XG4gICAgICAgIH0sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoRGVsYXkpO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZXMgdGhlIGN1cnJlbnQgc2VhcmNoIHF1ZXJ5LlxuICAgIHB1YmxpYyB1cGRhdGVRdWVyeShcbiAgICAgICAgcXVlcnk6c3RyaW5nLFxuICAgICAgICBjYWxsYmFjazooZXJyPzpFcnJvcikgPT4gdm9pZCA9ICgpID0+IHt9XG4gICAgKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fcXVlcnkgPSBxdWVyeTtcblxuICAgICAgICBpZiAodGhpcy5fcXVlcnkgPT09IFwiXCIgJiYgIXRoaXMuYWxsb3dFbXB0eVF1ZXJ5KSB7XG4gICAgICAgICAgICAvLyBEb24ndCB1cGRhdGUgaWYgdGhlIG5ldyBxdWVyeSBpcyBlbXB0eSAoYW5kIHdlIGRvbid0IGFsbG93IGVtcHR5IHF1ZXJpZXMpLlxuICAgICAgICAgICAgLy8gRG9uJ3QgcmVzZXQgc28gdGhhdCB3aGVuIGFuaW1hdGluZyBjbG9zZWQgd2UgZG9uJ3QgZ2V0IGEganVkZGVyLlxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fcmVzdWx0c0NhY2hlLmhhc093blByb3BlcnR5KHRoaXMuX3F1ZXJ5KSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIHF1ZXJ5IGlzIGFscmVhZHkgY2FjaGVkLCBtYWtlIHVzZSBvZiBpdC5cbiAgICAgICAgICAgIHRoaXMuX3Jlc3VsdHMgPSB0aGlzLl9yZXN1bHRzQ2FjaGVbdGhpcy5fcXVlcnldO1xuXG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zTG9va3VwKSB7XG4gICAgICAgICAgICB0aGlzLl9pc1NlYXJjaGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIENhbGwgdGhlIG9wdGlvbnMgbG9va3VwIHdpdGhvdXQgYSB0aGlzIGNvbnRleHQuXG4gICAgICAgICAgICBjb25zdCBxdWVyeUxvb2t1cCA9IHRoaXMuX29wdGlvbnNMb29rdXAuY2FsbChcbiAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgdGhpcy5fcXVlcnlcbiAgICAgICAgICAgICkgYXMgTG9va3VwRm5SZXN1bHQ8VFtdPjtcblxuICAgICAgICAgICAgcXVlcnlMb29rdXBcbiAgICAgICAgICAgICAgICAudGhlbihyZXN1bHRzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNTZWFyY2hpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVJlc3VsdHMocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVW5zZXQgJ2xvYWRpbmcnIHN0YXRlLCBhbmQgdGhyb3cgdGhlIHJldHVybmVkIGVycm9yIHdpdGhvdXQgdXBkYXRpbmcgdGhlIHJlc3VsdHMuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzU2VhcmNoaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gdGhpcy5vcHRpb25zRmlsdGVyLmNhbGwoXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLFxuICAgICAgICAgICAgdGhpcy5fcXVlcnlcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGZpbHRlcmVkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJlc3VsdHMoZmlsdGVyZWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZXMgJiBjYWNoZXMgdGhlIG5ldyBzZXQgb2YgcmVzdWx0cy5cbiAgICBwcml2YXRlIHVwZGF0ZVJlc3VsdHMocmVzdWx0czpUW10pOnZvaWQge1xuICAgICAgICB0aGlzLl9yZXN1bHRzQ2FjaGVbdGhpcy5fcXVlcnldID0gcmVzdWx0cztcbiAgICAgICAgdGhpcy5fcmVzdWx0cyA9IHJlc3VsdHM7XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByb21pc2UtZnVuY3Rpb24tYXN5bmNcbiAgICBwdWJsaWMgaW5pdGlhbExvb2t1cChpbml0aWFsOlUpOkxvb2t1cEZuUmVzdWx0PFQ+O1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcm9taXNlLWZ1bmN0aW9uLWFzeW5jXG4gICAgcHVibGljIGluaXRpYWxMb29rdXAoaW5pdGlhbDpVW10pOkxvb2t1cEZuUmVzdWx0PFRbXT47XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByb21pc2UtZnVuY3Rpb24tYXN5bmNcbiAgICBwdWJsaWMgaW5pdGlhbExvb2t1cChcbiAgICAgICAgaW5pdGlhbDpVIHwgVVtdXG4gICAgKTpMb29rdXBGblJlc3VsdDxUPiB8IExvb2t1cEZuUmVzdWx0PFRbXT4ge1xuICAgICAgICBpZiAoaW5pdGlhbCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gKCh0aGlzLl9vcHRpb25zTG9va3VwIGFzIHVua25vd24pIGFzIExvb2t1cEZuPFQsIFVbXT4pKFxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBpbml0aWFsXG4gICAgICAgICAgICApIGFzIExvb2t1cEZuUmVzdWx0PFRbXT47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLl9vcHRpb25zTG9va3VwIGFzIExvb2t1cEZuPFQsIFU+KShcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGluaXRpYWxcbiAgICAgICAgKSBhcyBMb29rdXBGblJlc3VsdDxUPjtcbiAgICB9XG5cbiAgICAvLyBDb252ZXJ0cyBhIHF1ZXJ5IHN0cmluZyB0byByZWdleCB3aXRob3V0IHRocm93aW5nIGFuIGVycm9yLlxuICAgIHByaXZhdGUgdG9SZWdleChxdWVyeTpzdHJpbmcpOlJlZ0V4cCB8IHN0cmluZyB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChxdWVyeSwgXCJpXCIpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gcXVlcnk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBHZW5lcmF0ZXMgSFRNTCBmb3IgaGlnaGxpZ2h0ZWQgbWF0Y2ggdGV4dC5cbiAgICBwdWJsaWMgaGlnaGxpZ2h0TWF0Y2hlcyh0ZXh0OnN0cmluZywgcXVlcnk6c3RyaW5nKTpzdHJpbmcge1xuICAgICAgICBjb25zdCByZWdleCA9IHRoaXMudG9SZWdleChxdWVyeSk7XG4gICAgICAgIGlmIChyZWdleCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZShyZWdleCwgbWF0Y2ggPT4gYDxiPiR7bWF0Y2h9PC9iPmApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cblxuICAgIC8vIFJlc2V0cyB0aGUgc2VhcmNoIGJhY2sgdG8gYSBwcmlzdGluZSBzdGF0ZS5cbiAgICBwcml2YXRlIHJlc2V0KCk6dm9pZCB7XG4gICAgICAgIHRoaXMuX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgdGhpcy5fcmVzdWx0c0NhY2hlID0ge307XG4gICAgICAgIHRoaXMuX2lzU2VhcmNoaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlUXVlcnkoXCJcIik7XG4gICAgfVxufVxuIl19