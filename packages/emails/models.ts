// Supabase injects these variables into the email template
export enum SupabaseEmailTemplateVariables {
  ConfirmationUrl = '{{ .ConfirmationURL }}',
  Token = '{{ .Token }}',
  TokenHash = '{{ .TokenHash }}',
  SiteUrl = '{{ .SiteURL }}',
  Email = '{{ .Email }}',
  NewEmail = '{{ .NewEmail }}', // only applicable to email change
}
