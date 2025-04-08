from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import requests
import os
import json

# --- Konfigurasi Post ---
POST_URL = 'https://www.instagram.com/p/DH6Om_uIZE5/'  # Ganti URL
username = "ordatwins"
location = "Barcelona"
likes = 4521

# Konfigurasi Chrome options
options = webdriver.ChromeOptions()
# Untuk debugging, tampilkan browser
# Kalau sudah stabil, kamu bisa aktifkan kembali headless
# options.add_argument('--headless')
options.add_argument('--disable-gpu')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
options.add_argument("user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36")

# Gunakan chromedriver lokal
service = Service(executable_path="./chromedriver-linux64/chromedriver")
driver = webdriver.Chrome(service=service, options=options)

try:
    driver.get(POST_URL)

    wait = WebDriverWait(driver, 10)

    # Tutup modal login jika ada
    try:
        close_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//div[contains(text(), 'Not now') or contains(text(), 'Lain kali')]")))
        close_btn.click()
        time.sleep(2)
    except:
        pass  # lanjut kalau tidak muncul

    # Tunggu elemen profile picture
    profile_pic_el = wait.until(EC.presence_of_element_located((By.XPATH, "//header//img")))
    profile_pic = profile_pic_el.get_attribute("src")

    # Tunggu elemen gambar post
    post_img_el = wait.until(EC.presence_of_element_located((By.XPATH, "//article//img")))
    post_img = post_img_el.get_attribute("src")

    # --- Download Gambar ---
    os.makedirs("downloads", exist_ok=True)
    profile_path = f"./assets/profile/{username}.jpg"
    post_path = f"./assets/{username}.jpg"

    def download_image(url, filename):
        try:
            resp = requests.get(url)
            if resp.status_code == 200:
                with open(filename, 'wb') as f:
                    f.write(resp.content)
                print(f"Saved: {filename}")
            else:
                print(f"Failed to download: {url}")
        except Exception as e:
            print(f"Download error: {e}")

    download_image(profile_pic, profile_path)
    download_image(post_img, post_path)

    # --- Output JSON ---
    result = {
        "username": username,
        "profilePic": f"../assets/profile/{username}.jpg",
        "postImage": f"../assets/{username}.jpg",
        "postUrl": POST_URL,
        "location": location,
        "likes": likes
    }

    
    print(json.dumps(result, indent=2))

finally:
    driver.quit()
