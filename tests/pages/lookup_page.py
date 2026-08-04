# pages/login_page.py

class LookupPage:
    def __init__(self, page):
        self.page = page
        self.reservation = page.locator('input[value]')
        self.submit = page.get_by_role("button", name="Search")
    
    def goto(self):
        self.page.goto("https://hotel.gswack.com")
        
    def lookup(self, reservation):
        self.reservation.fill(reservation)
        self.submit.click()
