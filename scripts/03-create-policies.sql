-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Diagnosis requests policies
CREATE POLICY "Users can view own diagnosis requests" ON diagnosis_requests
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own diagnosis requests" ON diagnosis_requests
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow anonymous diagnosis requests" ON diagnosis_requests
    FOR INSERT WITH CHECK (user_id IS NULL);

-- Battery requests policies
CREATE POLICY "Users can view own battery requests" ON battery_requests
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own battery requests" ON battery_requests
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow anonymous battery requests" ON battery_requests
    FOR INSERT WITH CHECK (user_id IS NULL);

-- Spare part requests policies
CREATE POLICY "Users can view own spare part requests" ON spare_part_requests
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own spare part requests" ON spare_part_requests
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow anonymous spare part requests" ON spare_part_requests
    FOR INSERT WITH CHECK (user_id IS NULL);

-- OBD inquiries policies
CREATE POLICY "Users can view own OBD inquiries" ON obd_inquiries
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own OBD inquiries" ON obd_inquiries
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow anonymous OBD inquiries" ON obd_inquiries
    FOR INSERT WITH CHECK (user_id IS NULL);

-- Garage demo requests policies
CREATE POLICY "Users can view own garage demo requests" ON garage_demo_requests
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own garage demo requests" ON garage_demo_requests
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow anonymous garage demo requests" ON garage_demo_requests
    FOR INSERT WITH CHECK (user_id IS NULL);

-- Community posts policies
CREATE POLICY "Anyone can view community posts" ON community_posts
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert community posts" ON community_posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own community posts" ON community_posts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own community posts" ON community_posts
    FOR DELETE USING (auth.uid() = user_id);

-- Contact inquiries policies (admin access only, but allow inserts)
CREATE POLICY "Anyone can insert contact inquiries" ON contact_inquiries
    FOR INSERT WITH CHECK (true);
