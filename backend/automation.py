from playwright.async_api import async_playwright
import random
import os
import asyncio

async def generate_speech(text: str, voice: str) -> str:
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        await page.goto("https://www.openai.fm")
        
        await page.fill("textarea[name='text']", text)  # از مرحله ۱ اصلاح کن
        
        await page.select_option("select[name='voice']", voice)
        
        tone_options = await page.query_selector_all("select[name='tone'] option")
        tones = [await option.inner_text() for option in tone_options if await option.inner_text()]
        if not tones:
            raise Exception("No tones available")
        
        selected_tone = random.choice(tones)
        await page.select_option("select[name='tone']", selected_tone)
        
        await page.click("button#generate")
        
        download = await page.wait_for_event("download")
        output_path = f"downloads/{text[:10]}.mp3"
        await download.save_as(output_path)
        
        await browser.close()
        return output_path
