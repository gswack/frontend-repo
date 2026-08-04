# test_ui/test_login.py

from pages.login_page import LoginPage
from pages.lookup_page import LookupPage

# Test data
hotel = "2"
name = "User User2"
email = "test@test.com"
checkin = "2000-01-01"
checkout = "2000-01-02"

def test_login_and_navigate(context):
    # Arrange
    page = context.new_page()
    login_page = LoginPage(page)
    login_page.goto()

    # Act 1: Create reservation
    login_page.login(hotel, name, email, checkin, checkout)

    # Assert
    assert login_page.is_reservation_created(), "Reservation success message should be visible"

# TODO: Implement the lookup test case
# def test_lookup_reservation(context):
    # Arrange
    # page = context.new_page()
    # lookup_page = LookupPage(page)
    # lookup_page.goto()
    # lookup_page.lookup(name)

    # # Assert
    # assert lookup_page.is_reservation_found(), "Reservation Found"        
