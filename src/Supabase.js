import { createClient } from "@supabase/supabase-js";

const sp = createClient("https://vlyrqlntoaqrrafufybv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZseXJxbG50b2FxcnJhZnVmeWJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzMzE0NDYsImV4cCI6MjAyNDkwNzQ0Nn0.CS21CLVfZKFD66Elev9DfcsXQD36IO9R6us7ieXbOVA");

export default sp