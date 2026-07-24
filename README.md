## Google OAuth Setup in Supabase

To set up sign-in with Google (Google OAuth), follow these steps:

### 1. Obtain credentials from Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or select an existing one).
3. Navigate to **APIs & Services** > **OAuth consent screen**:
   - Select the user type (User Type) — usually **External**.
   - Fill in the required fields (app name, support email, etc.) and save.
4. Navigate to **Credentials**:
   - Click **+ Create Credentials** and select **OAuth client ID**.
   - Select the application type (Application type) — **Web application**.
   - Add a name for client identification.
   - In the **Authorized redirect URIs** field, add the Redirect URL obtained from the Supabase Dashboard (see next step).
   - Click **Create** and save the generated **Client ID** and **Client Secret**.

### 2. Get Redirect URL and configure Supabase
1. Open your project in [Supabase Dashboard](https://supabase.com/dashboard).
2. Navigate to **Authentication** > **Providers** > **Google**.
3. Turn on the **Enable Google Provider** toggle.
4. Copy the value from the **Callback URL (redirect client)** field. This is your Redirect URL to be added to Google Cloud Console under **Authorized redirect URIs** (from step 1).
5. Paste the copied values from Google Cloud Console into the corresponding fields in Supabase:
   - **Client ID**
   - **Client Secret**
6. Click **Save**.