import pytest
from playwright.sync_api import sync_playwright

@pytest.fixture(scope="session")
def playwright():
    with sync_playwright() as p:
        yield p

@pytest.fixture()
def browser(playwright):
    browser = playwright.chromium.launch(headless=True)
    yield browser
    browser.close()

@pytest.fixture()
def context(browser):
    context = browser.new_context(
        record_video_dir="videos/"
    )
    context.tracing.start(
        screenshots=True,
        snapshots=True,
        sources=True
    )
    yield context
    context.tracing.stop(path="trace.zip")   # saved after each test
