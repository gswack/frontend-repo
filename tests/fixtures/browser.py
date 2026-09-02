# fixtures/browser.py

import pytest
from playwright.sync_api import sync_playwright

@pytest.fixture
def browser_context_traced(tmp_path):
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        context = browser.new_context()

        # Start tracing
        context.tracing.start(
            screenshots=True,
            snapshots=True,
            sources=True
        )

        page = context.new_page()
        yield page

        # Save trace
        trace_path = tmp_path / "trace.zip"
        context.tracing.stop(path=str(trace_path))

        browser.close()
