# pages/login_page.py

class LoginPage:
    def __init__(self, page):
        self.page = page
        self.hotel = page.locator('select[name="hotel"]')
        self.username = page.locator('input[name="fullName"]')
        self.email = page.locator('input[name="email"]')
        self.checkin = page.locator('input[name="checkIn"]')
        self.checkout = page.locator('input[name="checkOut"]')
        self.submit_button = page.get_by_role("button", name="Reserve")
        self.success_message = page.get_by_text("Reservation created successfully")

    def goto(self):
        self.page.goto("https://hotel.gswack.com")
        # expect(self.page).to_have_url("https://hotel.gswack.com")
        # expect(self.submit).to_be_visible()

    def login(self, hotel, user, email, checkin, checkout):
        self.hotel.select_option(hotel)
        self.username.fill(user)
        self.email.fill(email)
        self.checkin.fill(checkin)
        self.checkout.fill(checkout)
        self.submit_button.click()

    def is_reservation_created(self):
        self.success_message.wait_for(
            state="visible", 
            timeout=10000
        )
        return True
