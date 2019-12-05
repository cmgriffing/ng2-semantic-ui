var SuiAccordionService = /** @class */ (function () {
    function SuiAccordionService() {
        this.closeOthers = true;
        this.transition = "fade";
        this.transitionDuration = 350;
        this.panels = [];
    }
    SuiAccordionService.prototype.addPanel = function (panel) {
        panel.service = this;
        this.panels.push(panel);
    };
    SuiAccordionService.prototype.closeOtherPanels = function (panel) {
        if (!this.closeOthers) {
            return;
        }
        this.panels.forEach(function (p) {
            if (p !== panel) {
                p.isOpen = false;
            }
        });
    };
    return SuiAccordionService;
}());
export { SuiAccordionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2FjY29yZGlvbi9zZXJ2aWNlcy9hY2NvcmRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtJQVFJO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFFeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDekIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEdBQUcsQ0FBQztRQUU5QixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0sc0NBQVEsR0FBZixVQUFnQixLQUF1QjtRQUNuQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU0sOENBQWdCLEdBQXZCLFVBQXdCLEtBQXVCO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ25CLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztZQUNqQixJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBQ2IsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDcEI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCwwQkFBQztBQUFELENBQUMsQUFqQ0QsSUFpQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWlBY2NvcmRpb25QYW5lbCB9IGZyb20gXCIuLi9jb21wb25lbnRzL2FjY29yZGlvbi1wYW5lbFwiO1xuXG5leHBvcnQgY2xhc3MgU3VpQWNjb3JkaW9uU2VydmljZSB7XG4gICAgcHVibGljIGNsb3NlT3RoZXJzOmJvb2xlYW47XG5cbiAgICBwdWJsaWMgdHJhbnNpdGlvbjpzdHJpbmc7XG4gICAgcHVibGljIHRyYW5zaXRpb25EdXJhdGlvbjpudW1iZXI7XG5cbiAgICBwdWJsaWMgcGFuZWxzOlN1aUFjY29yZGlvblBhbmVsW107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jbG9zZU90aGVycyA9IHRydWU7XG5cbiAgICAgICAgdGhpcy50cmFuc2l0aW9uID0gXCJmYWRlXCI7XG4gICAgICAgIHRoaXMudHJhbnNpdGlvbkR1cmF0aW9uID0gMzUwO1xuXG4gICAgICAgIHRoaXMucGFuZWxzID0gW107XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFBhbmVsKHBhbmVsOlN1aUFjY29yZGlvblBhbmVsKTp2b2lkIHtcbiAgICAgICAgcGFuZWwuc2VydmljZSA9IHRoaXM7XG4gICAgICAgIHRoaXMucGFuZWxzLnB1c2gocGFuZWwpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZU90aGVyUGFuZWxzKHBhbmVsOlN1aUFjY29yZGlvblBhbmVsKTp2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmNsb3NlT3RoZXJzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBhbmVscy5mb3JFYWNoKHAgPT4ge1xuICAgICAgICAgICAgaWYgKHAgIT09IHBhbmVsKSB7XG4gICAgICAgICAgICAgICAgcC5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19