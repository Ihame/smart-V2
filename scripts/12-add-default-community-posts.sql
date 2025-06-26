-- Add Default Community Posts for SmartGarage
-- These posts will always be visible to create an active community feel

-- First, create a system user for default posts
INSERT INTO profiles (id, full_name, email, is_admin, created_at) VALUES
('99999999-9999-9999-9999-999999999999', 'SmartGarage Team', 'team@smartgarage.rw', true, NOW() - INTERVAL '60 days')
ON CONFLICT (id) DO NOTHING;

-- Insert engaging default community posts
INSERT INTO community_posts (user_id, content, created_at) VALUES
('99999999-9999-9999-9999-999999999999', '🎉 Welcome to the SmartGarage Community! 

We''re excited to have you join Rwanda''s premier automotive technology platform. Here you can:

✅ Share your EV and hybrid experiences
✅ Get expert advice from our team
✅ Connect with fellow car enthusiasts
✅ Access exclusive tips and updates

Let''s build the future of automotive care together! 🚗⚡', NOW() - INTERVAL '30 days'),

('99999999-9999-9999-9999-999999999999', '🔋 EV Battery Care Tips for Rwanda''s Climate

Living in Rwanda''s beautiful climate? Here are essential battery care tips:

🌡️ **Temperature Management**: Park in shade when possible
⚡ **Charging Habits**: Avoid charging to 100% daily (80% is optimal)
🚗 **Driving Style**: Smooth acceleration extends battery life
🔧 **Regular Checks**: Monthly battery health monitoring

Our AI Battery Prediction service can help optimize your battery''s lifespan. Book your analysis today! 

#EVTips #Rwanda #SmartGarage', NOW() - INTERVAL '25 days'),

('99999999-9999-9999-9999-999999999999', '🛠️ Common Hybrid Issues in East Africa

After analyzing 1000+ hybrid vehicles across Rwanda, Uganda, and Kenya, here are the most common issues we see:

1️⃣ **Cooling System Problems** (35% of cases)
2️⃣ **Battery Degradation** (28% of cases)  
3️⃣ **Inverter Issues** (18% of cases)
4️⃣ **Sensor Malfunctions** (12% of cases)
5️⃣ **Software Glitches** (7% of cases)

Good news: 80% of these are preventable with proper maintenance! 

Our Virtual Diagnosis service can detect these early. Only 10,000 RWF ($7 USD) - much cheaper than major repairs!

#HybridCare #PreventiveMaintenance', NOW() - INTERVAL '20 days'),

('99999999-9999-9999-9999-999999999999', '📊 SmartGarage by the Numbers

🎯 **2,500+** Virtual Diagnoses Completed
🔋 **1,800+** Battery Predictions Delivered  
🛠️ **5,000+** Spare Parts Sourced
🚗 **150+** Garages Using Our ERP System
⭐ **4.9/5** Average Customer Rating

Thank you for making SmartGarage Rwanda''s #1 automotive tech platform! 

What would you like to see next? Drop your suggestions below! 👇

#SmartGarageStats #Rwanda #Innovation', NOW() - INTERVAL '15 days'),

('99999999-9999-9999-9999-999999999999', '🚨 Important: Technical Inspection Reminders

📅 **March 2024 Deadline Approaching!**

If your vehicle inspection expires in March, book NOW to avoid:
❌ 50,000 RWF penalty
❌ Vehicle impoundment  
❌ Insurance complications

✅ **SmartGarage Solution**: Our Smart Car Reminders ensure you never miss important dates!

We automatically track:
🔔 Technical inspections
🔔 Insurance renewals
🔔 Maintenance schedules
🔔 Battery health checks

Stay compliant, stay safe! 🛡️

#TechnicalInspection #Rwanda #SmartReminders', NOW() - INTERVAL '10 days'),

('99999999-9999-9999-9999-999999999999', '💡 Did You Know? EV Myths Busted!

❌ **MYTH**: "EVs don''t work in cold weather"
✅ **FACT**: Modern EVs perform well in all climates with proper care

❌ **MYTH**: "EV batteries die after 5 years"  
✅ **FACT**: Most EV batteries last 8-15 years with 70%+ capacity

❌ **MYTH**: "EVs are too expensive to maintain"
✅ **FACT**: EVs have 60% fewer moving parts = lower maintenance costs

❌ **MYTH**: "You can''t find EV parts in Rwanda"
✅ **FACT**: SmartGarage Spares Hunter sources parts globally!

Got more EV questions? Ask our community! 🤝

#EVMyths #ElectricVehicles #Rwanda', NOW() - INTERVAL '7 days'),

('99999999-9999-9999-9999-999999999999', '🎓 Free EV Workshop This Saturday!

📍 **Location**: Kigali Convention Centre
🕐 **Time**: 9:00 AM - 4:00 PM
💰 **Cost**: FREE (Registration required)

**What You''ll Learn**:
🔋 Battery maintenance best practices
⚡ Optimal charging strategies  
🛠️ DIY troubleshooting techniques
💰 Cost-saving maintenance tips
🔧 When to seek professional help

**Special Offers**:
✨ 50% off Virtual Diagnosis (workshop attendees only)
✨ Free OBD scanner demo
✨ Meet the SmartGarage team

Register: team@smartgarage.rw or call +250 788 SMART

See you there! 🚗💨

#EVWorkshop #Kigali #FreeTraining', NOW() - INTERVAL '3 days'),

('99999999-9999-9999-9999-999999999999', '🌍 SmartGarage Goes Continental!

Big news! We''re expanding across East Africa:

🇷🇼 **Rwanda**: 50+ partner garages (ACTIVE)
🇺🇬 **Uganda**: Launching March 2024
🇰🇪 **Kenya**: Launching April 2024  
🇹🇿 **Tanzania**: Launching May 2024

**What This Means for You**:
✅ Wider spare parts network
✅ Cross-border service support
✅ Regional EV community
✅ Bulk pricing advantages

The future of African automotive care is here! 🚀

Interested in becoming a partner garage? Contact us!

#Expansion #EastAfrica #SmartGarage', NOW() - INTERVAL '1 day'),

('99999999-9999-9999-9999-999999999999', '🏆 Customer Success Story

**Meet Jean Baptiste** - Tesla Model 3 Owner from Kigali

"I was worried about my Tesla''s battery performance after 2 years. SmartGarage''s AI Battery Prediction not only assessed my current battery health (92% - excellent!) but also provided a personalized maintenance plan.

Following their recommendations:
📈 Range increased by 15%
💰 Saved 300,000 RWF on unnecessary service
🔋 Battery degradation slowed significantly

The 15,000 RWF investment paid for itself in the first month!"

**Ready for your battery analysis?** Book today!

#CustomerSuccess #Tesla #BatteryHealth #Rwanda', NOW() - INTERVAL '12 hours'),

('99999999-9999-9999-9999-999999999999', '🔧 Garage Owners: Transform Your Business!

**SmartGarage ERP System Results**:

📊 **Efficiency**: +40% average improvement
💰 **Revenue**: +25% increase in 6 months
⭐ **Customer Satisfaction**: 4.8/5 average rating
📱 **Digital Transformation**: 100% paperless operations

**Features Include**:
✅ Customer management
✅ Inventory tracking  
✅ Service scheduling
✅ Financial reporting
✅ Staff management
✅ Mobile app access

**Special Offer**: First 3 months FREE for new garages!

Ready to modernize? Book your demo today! 

#GarageERP #BusinessGrowth #Rwanda', NOW() - INTERVAL '6 hours'),

('99999999-9999-9999-9999-999999999999', '🎯 Quick Poll: What''s Your Biggest Car Challenge?

Help us serve you better! What''s your #1 automotive challenge?

A) 🔋 Battery/hybrid system issues
B) 🛠️ Finding reliable spare parts  
C) 💰 High maintenance costs
D) 🔍 Trustworthy diagnostic services
E) 📅 Keeping track of service schedules

Comment with your letter choice! Based on your feedback, we''ll create targeted solutions.

**Bonus**: First 10 responses get a FREE Virtual Diagnosis voucher! 🎁

#Community #Feedback #SmartGarage', NOW() - INTERVAL '2 hours'),

('99999999-9999-9999-9999-999999999999', '🚗 Weekend Project: DIY Car Health Check

Can''t make it to a garage this weekend? Here''s a simple 15-minute health check:

**Visual Inspection** (5 min):
🔍 Check tire pressure and tread
🔍 Look for fluid leaks under car
🔍 Inspect lights and indicators

**Under the Hood** (5 min):
🔋 Check battery terminals for corrosion
🛢️ Verify fluid levels (if accessible)
🔌 Look for loose connections

**Interior Check** (5 min):
📱 Test all electronic systems
🚨 Check warning lights
🔊 Listen for unusual sounds

**Red Flags?** Book a Virtual Diagnosis immediately!

Stay safe, stay proactive! 🛡️

#DIYMaintenance #CarCare #WeekendProject', NOW() - INTERVAL '30 minutes');

-- Success message
SELECT 'Default community posts added successfully! Your community now has engaging content.' as result;
