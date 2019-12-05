// Keyboard keycodes.
export var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["Left"] = 37] = "Left";
    KeyCode[KeyCode["Up"] = 38] = "Up";
    KeyCode[KeyCode["Right"] = 39] = "Right";
    KeyCode[KeyCode["Down"] = 40] = "Down";
    KeyCode[KeyCode["Escape"] = 27] = "Escape";
    KeyCode[KeyCode["Enter"] = 13] = "Enter";
    KeyCode[KeyCode["Space"] = 32] = "Space";
    KeyCode[KeyCode["Backspace"] = 8] = "Backspace";
})(KeyCode || (KeyCode = {}));
var HandledEvent = /** @class */ (function () {
    function HandledEvent() {
    }
    return HandledEvent;
}());
export { HandledEvent };
export var Util = {
    Array: {
        range: function (n, offset) {
            if (offset === void 0) { offset = 0; }
            return Array(n)
                .fill(0)
                .map(function (z, i) { return i + offset; });
        },
        group: function (items, groupLength) {
            var mutable = items.slice(0);
            var groups = [];
            while (mutable.length > 0) {
                groups.push(mutable.splice(0, groupLength));
            }
            return groups;
        },
        groupBy: function (items, field) {
            return items.reduce(function (groups, i) {
                var fieldValue = i[field].toString();
                groups[fieldValue] = groups[fieldValue] || [];
                groups[fieldValue].push(i);
                return groups;
            }, Object());
        },
        flatten: function (items) {
            return items.reduce(function (is, i) { return is.concat(i); }, []);
        }
    },
    String: {
        padLeft: function (str, length, padding) {
            var s = str;
            while (s.length < length) {
                s = padding + s;
            }
            return s;
        }
    },
    DOM: {
        parseBooleanAttribute: function (attributeValue) {
            var value = attributeValue;
            if (typeof attributeValue === "string") {
                value = true;
            }
            return value;
        }
    },
    Object: {
        readValue: function (object, path) {
            if (!path) {
                return object;
            }
            var recursed;
            for (var i = 0, p = path.split("."), len = p.length; i < len; i++) {
                recursed = object[p[i]];
            }
            return recursed;
        }
    },
    Math: {
        round: function (r, n) {
            return Math.round(r / n) * n;
        },
        roundUp: function (r, n) {
            return Math.ceil(r / n) * n;
        },
        roundDown: function (r, n) {
            return Math.floor(r / n) * n;
        },
        mod: function (r, n) {
            var rem = r % n;
            if (rem < 0) {
                return rem + n;
            }
            return rem;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1pc2MvdXRpbC9oZWxwZXJzL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscUJBQXFCO0FBQ3JCLE1BQU0sQ0FBTixJQUFZLE9BV1g7QUFYRCxXQUFZLE9BQU87SUFDZixzQ0FBUyxDQUFBO0lBQ1Qsa0NBQU8sQ0FBQTtJQUNQLHdDQUFVLENBQUE7SUFDVixzQ0FBUyxDQUFBO0lBRVQsMENBQVcsQ0FBQTtJQUNYLHdDQUFVLENBQUE7SUFFVix3Q0FBVSxDQUFBO0lBQ1YsK0NBQWEsQ0FBQTtBQUNqQixDQUFDLEVBWFcsT0FBTyxLQUFQLE9BQU8sUUFXbEI7QUFjRDtJQUFBO0lBRUEsQ0FBQztJQUFELG1CQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7O0FBTUQsTUFBTSxDQUFDLElBQU0sSUFBSSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILEtBQUssRUFBTCxVQUFNLENBQVEsRUFBRSxNQUFpQjtZQUFqQix1QkFBQSxFQUFBLFVBQWlCO1lBQzdCLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDVixJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUNQLEdBQUcsQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLEdBQUcsTUFBTSxFQUFWLENBQVUsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFDRCxLQUFLLEVBQUwsVUFBUyxLQUFTLEVBQUUsV0FBa0I7WUFDbEMsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUvQixJQUFNLE1BQU0sR0FBUyxFQUFFLENBQUM7WUFDeEIsT0FBTyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO2FBQy9D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T0FBTyxHQUFHLENBQUM7UUFDZixDQUFDO0tBQ0o7Q0FDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gS2V5Ym9hcmQga2V5Y29kZXMuXG5leHBvcnQgZW51bSBLZXlDb2RlIHtcbiAgICBMZWZ0ID0gMzcsXG4gICAgVXAgPSAzOCxcbiAgICBSaWdodCA9IDM5LFxuICAgIERvd24gPSA0MCxcblxuICAgIEVzY2FwZSA9IDI3LFxuICAgIEVudGVyID0gMTMsXG5cbiAgICBTcGFjZSA9IDMyLFxuICAgIEJhY2tzcGFjZSA9IDhcbn1cblxuaW50ZXJmYWNlIElSZWN1cnNpdmVPYmplY3Qge1xuICAgIFtuYW1lOnN0cmluZ106SVJlY3Vyc2l2ZU9iamVjdDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJVGVtcGxhdGVSZWZDb250ZXh0PFQ+IHtcbiAgICAkaW1wbGljaXQ6VDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQXVnbWVudGVkRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICAgIGNsb3Nlc3Qoc2VsZWN0b3I6c3RyaW5nKTpJQXVnbWVudGVkRWxlbWVudDtcbn1cblxuZXhwb3J0IGNsYXNzIEhhbmRsZWRFdmVudCB7XG4gICAgcHVibGljIGV2ZW50SGFuZGxlZDpib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEeW5hbWljQ2xhc3NlcyB7XG4gICAgW25hbWU6c3RyaW5nXTp0cnVlO1xufVxuXG5leHBvcnQgY29uc3QgVXRpbCA9IHtcbiAgICBBcnJheToge1xuICAgICAgICByYW5nZShuOm51bWJlciwgb2Zmc2V0Om51bWJlciA9IDApOm51bWJlcltdIHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheShuKVxuICAgICAgICAgICAgICAgIC5maWxsKDApXG4gICAgICAgICAgICAgICAgLm1hcCgoeiwgaSkgPT4gaSArIG9mZnNldCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdyb3VwPFQ+KGl0ZW1zOlRbXSwgZ3JvdXBMZW5ndGg6bnVtYmVyKTpUW11bXSB7XG4gICAgICAgICAgICBjb25zdCBtdXRhYmxlID0gaXRlbXMuc2xpY2UoMCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGdyb3VwczpUW11bXSA9IFtdO1xuICAgICAgICAgICAgd2hpbGUgKG11dGFibGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGdyb3Vwcy5wdXNoKG11dGFibGUuc3BsaWNlKDAsIGdyb3VwTGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZ3JvdXBzO1xuICAgICAgICB9LFxuICAgICAgICBncm91cEJ5PFQ+KGl0ZW1zOlRbXSwgZmllbGQ6a2V5b2YgVCk6eyBbbmFtZTpzdHJpbmddOlRbXSB9IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtcy5yZWR1Y2U8eyBbbmFtZTpzdHJpbmddOlRbXSB9PigoZ3JvdXBzLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmllbGRWYWx1ZSA9IChpW2ZpZWxkXSBhcyBhbnkpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgZ3JvdXBzW2ZpZWxkVmFsdWVdID0gZ3JvdXBzW2ZpZWxkVmFsdWVdIHx8IFtdO1xuICAgICAgICAgICAgICAgIGdyb3Vwc1tmaWVsZFZhbHVlXS5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBncm91cHM7XG4gICAgICAgICAgICB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0KCkpO1xuICAgICAgICB9LFxuICAgICAgICBmbGF0dGVuPFQ+KGl0ZW1zOlRbXVtdKTpUW10ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLnJlZHVjZSgoaXMsIGkpID0+IGlzLmNvbmNhdChpKSwgW10pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIFN0cmluZzoge1xuICAgICAgICBwYWRMZWZ0KHN0cjpzdHJpbmcsIGxlbmd0aDpudW1iZXIsIHBhZGRpbmc6c3RyaW5nKTpzdHJpbmcge1xuICAgICAgICAgICAgbGV0IHMgPSBzdHI7XG4gICAgICAgICAgICB3aGlsZSAocy5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzID0gcGFkZGluZyArIHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBET006IHtcbiAgICAgICAgcGFyc2VCb29sZWFuQXR0cmlidXRlKGF0dHJpYnV0ZVZhbHVlOmJvb2xlYW4pOmJvb2xlYW4ge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gYXR0cmlidXRlVmFsdWU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZVZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgT2JqZWN0OiB7XG4gICAgICAgIHJlYWRWYWx1ZTxULCBVPihvYmplY3Q6VCwgcGF0aD86c3RyaW5nKTpVIHtcbiAgICAgICAgICAgIGlmICghcGF0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAob2JqZWN0IGFzIGFueSkgYXMgVTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHJlY3Vyc2VkOklSZWN1cnNpdmVPYmplY3QgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBwID0gcGF0aC5zcGxpdChcIi5cIiksIGxlbiA9IHAubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZWN1cnNlZCA9ICgob2JqZWN0IGFzIGFueSkgYXMgSVJlY3Vyc2l2ZU9iamVjdClbcFtpXV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAocmVjdXJzZWQgYXMgYW55KSBhcyBVO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIE1hdGg6IHtcbiAgICAgICAgcm91bmQocjpudW1iZXIsIG46bnVtYmVyKTpudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQociAvIG4pICogbjtcbiAgICAgICAgfSxcbiAgICAgICAgcm91bmRVcChyOm51bWJlciwgbjpudW1iZXIpOm51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKHIgLyBuKSAqIG47XG4gICAgICAgIH0sXG4gICAgICAgIHJvdW5kRG93bihyOm51bWJlciwgbjpudW1iZXIpOm51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihyIC8gbikgKiBuO1xuICAgICAgICB9LFxuICAgICAgICBtb2QocjpudW1iZXIsIG46bnVtYmVyKTpudW1iZXIge1xuICAgICAgICAgICAgY29uc3QgcmVtID0gciAlIG47XG4gICAgICAgICAgICBpZiAocmVtIDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZW0gKyBuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlbTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iXX0=