# Reveused Page Topology

## Global Layout
- Body background: black on desktop, invitation column itself is 390px mobile / ~460px desktop.
- Root sequence: preloader -> cover/open state -> scrollable invitation panels.
- Fixed overlays: desktop left image/title panel; hamburger menu button; side menu overlay when opened.

## Sections
1. OpeningHero
   - Selector: #pertama
   - ID/data-id: pertama / 4f9135e8
   - Mobile rect: 390x844 at y=0
   - Desktop rect: 460x1200 at y=0
   - Interaction model: opening cover + unlocked hero
   - Background: N/A
   - Text: THE WEDDING OF Imam Nandira SATURDAY, 9TH DECEMBER 202X

2. ScriptureQuoteSection
   - Selector: [data-id="133f2f8f"]
   - ID/data-id: none / 133f2f8f
   - Mobile rect: 390x844 at y=844
   - Desktop rect: 460x1200 at y=1200
   - Interaction model: static
   - Background: public/images/reveused/reveused-imam-nandira-00195-copy.jpg.jpeg
   - Text: Two are better than one because they have a good reward for their toil. For if they fall, one will lift up his fellow. But woe to him who is alone when he falls and has not another to lift him up! Again, if two lie toget...

3. GroomProfileSection
   - Selector: #profile
   - ID/data-id: profile / 34d8a14c
   - Mobile rect: 390x844 at y=1688
   - Desktop rect: 460x1200 at y=2400
   - Interaction model: static with external Instagram link
   - Background: public/images/reveused/reveused-imam-nandira-00188.jpg.jpeg
   - Text: THE GROOM Imam Faizan The second son of Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Imam

4. BrideProfileSection
   - Selector: [data-id="6895dbbe"]
   - ID/data-id: none / 6895dbbe
   - Mobile rect: 390x844 at y=2532
   - Desktop rect: 460x1200 at y=3600
   - Interaction model: static with external Instagram link
   - Background: public/images/reveused/reveused-imam-nandira-00137.jpg.jpeg
   - Text: THE BRIDE Nandira Syafira The first daughter of Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Nandira

5. LoveStorySection
   - Selector: #lovestory
   - ID/data-id: lovestory / 625dfc9f
   - Mobile rect: 390x844 at y=3376
   - Desktop rect: 460x1200 at y=4800
   - Interaction model: static timeline
   - Background: public/images/reveused/reveused-imam-nandira-00204.jpg.jpeg
   - Text: A journey in love SEPTEMBER 2019 2019, we started our journey as two individuals who were just getting to know each other. We were excited to explore what the future held for us and were eager to see where our paths woul...

6. WeddingDateSection
   - Selector: #weddingevent
   - ID/data-id: weddingevent / 387c889a
   - Mobile rect: 390x844 at y=4220
   - Desktop rect: 460x1200 at y=6000
   - Interaction model: static
   - Background: public/images/reveused/reveused-imam-nandira-00187.jpg.jpeg
   - Text: SAVE OUR DATE SATURDAY 01 MARCH 202X

7. CountdownSection
   - Selector: [data-id="6935054a"]
   - ID/data-id: none / 6935054a
   - Mobile rect: 390x844 at y=5064
   - Desktop rect: 460x1200 at y=7200
   - Interaction model: time-driven countdown display frozen at zero in capture
   - Background: public/images/reveused/reveused-imam-nandira-00152.jpg.jpeg
   - Text: ALMOST TIME FOR OURCELEBRATION 00 DAYS 00 HOURS 00 MINUTES 00 SECONDS SAVE THE DATE

8. RsvpSection
   - Selector: #rsvp
   - ID/data-id: rsvp / 30434dcd
   - Mobile rect: 390x844 at y=5908
   - Desktop rect: 460x1200 at y=8400
   - Interaction model: click/form-driven mock RSVP
   - Background: public/images/reveused/reveused-imam-nandira-00189-copy.jpg.jpeg
   - Text: Kindly Confirm Your Presence And Share Your Blessings Kindly express your best wishes and kindly confirm your attendance by using the form provided below. Thank you. 1 2 3 4 NAME NEXT

9. WishesSection
   - Selector: [data-id="f0d4436"]
   - ID/data-id: none / f0d4436
   - Mobile rect: 390x844 at y=6752
   - Desktop rect: 460x1200 at y=9600
   - Interaction model: click-driven carousel controls mocked
   - Background: public/images/reveused/reveused-imam-nandira-00189.jpg.jpeg
   - Text: Wishes NEXT Guest Name Selamat 20 Jun 2025 Jaya Sangat Fungsional dan Cakep banget undangannya ! Fitur sangat baik dan rapi polll 27 Nov 2024 Mr. Example Maaf, hanya untuk yang sudah melakukan pembelian dan memiliki akun...

10. DressCodeSection
   - Selector: [data-id="56e9ab26"]
   - ID/data-id: none / 56e9ab26
   - Mobile rect: 390x844 at y=7596
   - Desktop rect: 460x1200 at y=10800
   - Interaction model: static
   - Background: public/images/reveused/reveused-imam-nandira-00200-copy.jpg.jpeg
   - Text: Imam Nandira A GUIDE TO DRESS CODES We kindly encourage our guests to wear these colors for our special day

11. StreamingSection
   - Selector: [data-id="545a0069"]
   - ID/data-id: none / 545a0069
   - Mobile rect: 390x844 at y=8440
   - Desktop rect: 460x1200 at y=12000
   - Interaction model: external link
   - Background: public/images/reveused/reveused-imam-nandira-00139.jpg.jpeg
   - Text: JOIN OUR EXCLUSIVE LIVE STREAMING EVENT SATURDAY, 1 MARCH 202X - 11.00 WIB Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Join Streaming

12. GiftSection
   - Selector: #weddinggift
   - ID/data-id: weddinggift / 3b3adb8e
   - Mobile rect: 390x844 at y=9284
   - Desktop rect: 460x1200 at y=13200
   - Interaction model: copy-button interactions
   - Background: public/images/reveused/reveused-imam-nandira-00171.jpg.jpeg
   - Text: Wedding Gift For those of you who want to give a token of love to the bride and groom, you can use the account number below: Shirley Lorraine Bank BCA 0087771222 Shirley Lorraine Bank Mandiri 001231200 Brandon William Ba...

13. GallerySection
   - Selector: #gallery
   - ID/data-id: gallery / 72b6bff9
   - Mobile rect: 390x844 at y=10128
   - Desktop rect: 460x1200 at y=14400
   - Interaction model: time/click-driven image carousel
   - Background: N/A
   - Text: OUR PRE-WEDDING CELEBRATION IMAM NANDIRA 3/8 Click image for preview

14. VideoStorySection
   - Selector: [data-id="7a254bb2"]
   - ID/data-id: none / 7a254bb2
   - Mobile rect: 390x844 at y=10972
   - Desktop rect: 460x1200 at y=15600
   - Interaction model: click-driven video play placeholder
   - Background: public/images/reveused/reveused-imam-nandira-00189-copy.jpg.jpeg
   - Text: UNVEILING OUR PREWEDDING STORY Play Video Every love story is beautiful, but ours is my favorite. Through the highs and lows, our love grows stronger and deeper with each passing day.

15. ClosingSection
   - Selector: [data-id="496dc690"]
   - ID/data-id: none / 496dc690
   - Mobile rect: 390x844 at y=11816
   - Desktop rect: 460x1200 at y=16800
   - Interaction model: static footer links
   - Background: public/images/reveused/reveused-imam-nandira-00141.jpg.jpeg
   - Text: THANK YOU FOR YOUR ATTENDANCE It is a pleasure and honor for us, if you are willing to attend and give us your blessing. IMAM NANDIRA CREATED BY GROOVE PUBLIC +62 813-2757-7133 GROOVEPUBLIC.ID GROOVEPUBLIC.COM © All righ...
