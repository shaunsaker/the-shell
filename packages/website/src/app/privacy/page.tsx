import { HeadingText, ParagraphText, TitleText } from 'components'
import { app } from 'config'
import React from 'react'

import { Container } from '@/components/container/Container'
import { Section } from '@/components/section/Section'

export default async function Page() {
  return (
    <Section className="min-h-screen mt-[63px]">
      <Container>
        <TitleText>{app.website.privacy.title}</TitleText>

        <ParagraphText className="mt-16 text-left flex flex-col gap-y-8">
          <HeadingText>1. Introduction</HeadingText>
          This Privacy Policy applies to the website {process.env.NEXT_PUBLIC_URL} (hereinafter the “website”) published
          by the company {app.name} (hereinafter “the company” or “we”) and its other services and products for which
          personal data is being communicated to the company. Please read this Privacy Policy carefully as it explains
          how the company uses your personal data and how to exercise your rights. This Privacy Policy supplements the
          Terms & Conditions or any documents or notices that may refer to this Privacy Policy. Should you have any
          questions, you may directly contact the company by sending an email to {app.support.email}.
          <HeadingText>2. Definitions</HeadingText>
          DATA means data about a living individual who can be identified from those data (or from those and other
          information either in our possession or likely to come into our possession). USAGE DATA is data collected
          automatically either generated by the use of Service or from Service infrastructure itself (for example, the
          duration of a page visit). COOKIES are small files stored on your device (computer or mobile device). DATA
          CONTROLLER means a natural or legal person who (either alone or jointly or in common with other persons)
          determines the purposes for which and the manner in which any personal data are, or are to be, processed. For
          the purpose of this Privacy Policy, we are a Data Controller of your data. DATA PROCESSORS (OR SERVICE
          PROVIDERS) means any natural or legal person who processes the data on behalf of the Data Controller. We may
          use the services of various Service Providers in order to process your data more effectively. DATA SUBJECT is
          any living individual who is the subject of Personal Data. THE USER is the individual using our Service. The
          User corresponds to the Data Subject, who is the subject of Personal Data.
          <HeadingText>3. Legal context</HeadingText>
          We abide by the recommendations of the relevant authorities and have put in place an organization to ensure
          our compliance with the regulatory framework established by the General Data Protection Regulation (EU)
          2016/679 of the European Parliament and of the Council (GDPR) and any other laws or regulations relating to
          personal information that apply to us.
          <HeadingText>4. What is our role?</HeadingText>
          Under the GDPR, we are considered as a data controller. It means that we set the whys and hows we process your
          personal information. For example, when you are visiting our website, we are in charge of determining the
          purposes and the means that are necessary to administer, operate and manage our users&apos; personal
          information that we collect from it. Depending on the activity we perform on your data, we may also be
          considered as a data processor. This means that you are our customer&apos;s end user and that we are
          processing your data under the instructions of our customer considered as a data controller. In this case, the
          data controller sets the purposes and means of the processing activity, and we abide and deliver our service
          in regards to these.
          <HeadingText>5. What kind of personal information do we process?</HeadingText>
          We only collect and process personal information that is relevant and adequate. We give special attention to
          its accuracy and updates when needed. Personal information includes in particular: Type of data Examples of
          data Connection data e.g. IP address, logs, terminal and connection identifiers, timestamp, etc. Internet data
          e.g. cookies, tracers, navigation data, audience metrics, etc. Identification data e.g. first name, last name,
          picture, birth date, etc. The collection of this information may at times be mandatory in order to provide our
          service, other times optional to enhance your experience and left to your good will. Mandatory information
          will be identified as such when we collect your data. Know that if you refuse to provide it, the company
          won&apos;t be able to provide you with its utmost service and you will unfortunately experience
          inconveniences.
          <HeadingText>6. When do we collect your personal information?</HeadingText>
          We collect your personal information on various occasions. Sources Description Website or software visit
          Individual browsed our website or our solution Billing form Individual filled in a payment checkout
          <HeadingText>7. How do we use your personal information?</HeadingText>Your personal information will never be
          processed for incompatible purposes regarding why it was first collected. We only collect and process personal
          information for specified, explicit and legitimate purposes, like: Processing Activities Purposes Legal basis
          Website audience measurement To gather analytics on the website traffic Consent Payment & billing management
          To process money transactions Contractual duties In order to comply with the principle of lawfulness, the
          legal bases for each data processing is determined carefully and on a case-by-case basis in accordance with
          the list provided by Article 6 of the GDPR. We do not process your data or use automated decision making
          without your knowledge, nor do we sell or rent your personal information without your explicit consent.
          <HeadingText>8. Who can access your personal information?</HeadingText>
          Recipients to whom we disclose your personal information are carefully chosen by us. They receive data for
          legitimate purposes, especially when it comes to pursuing our business activity and providing a qualitative
          service: Subprocessor Service provided Lemon Squeezy LLC Payment processing Certain data recipients are
          considered our data processors in accordance with Article 28 of the GDPR, which means we review how they
          handle personal information and make sure they put in place appropriate guarantees to protect it. Other
          recipients are considered authorized third parties in accordance with Article 4 of the GDPR, which means we
          have to communicate your personal information to them to comply with applicable legal obligations, lawful
          requests and processes (subpoenas, requests from government or tax authorities, etc.).
          <HeadingText>9. Where do we transfer your personal information?</HeadingText>
          As far as possible, your personal information is processed within the European Union. However, some of our
          service providers may be located in another country of which you are a resident or pursuing their activity
          outside of the European Union. When we transfer your personal information to a recipient outside the European
          Union, we take care of putting in place sufficient guarantees in accordance with the list provided by Articles
          44 to 50 of the GDPR, whether it is having it stored in a country with an adequate privacy protection or
          contracting Data Protection Agreements to ensure your personal information is protected. Subprocessor Location
          Adopted safeguard
          <HeadingText>10. How long do we store your personal information?</HeadingText>
          As a general rule when we are considered a data controller by the GDPR, retention periods of your personal
          information are determined according to the purposes for which we collected it and our legal obligations.
          Regarding our activities as a data processor, we retain our customers&apos; end users personal information as
          long as required by our terms and conditions and the pursuing of the service our customers&apos; subscribed
          to. When these purposes are fulfilled or when you ask us, your personal information is archived, erased or
          anonymized.
          <HeadingText>11. How do we protect your personal information?</HeadingText>
          We care deeply about the safety of your personal information and that is why we put in place adequate
          technical and organizational security measures to preserve its confidentiality, integrity and availability. We
          take into account the risks for your rights and freedoms and therefore follow with great care the
          recommendations of the competent authorities regarding security.
          <HeadingText>12. What are your rights and how to exercise them?</HeadingText>
          In accordance with Articles 12 to 23 of GDPR, you have rights over your personal information that we are
          committed to respect: you can request access to your personal information and a copy of it you can ask us to
          modify your personal information if you consider it obsolete, inaccurate or incomplete. you can object to the
          processing of your personal information if based on our legitimate interest in certain circumstances. you can
          request to restrict the processing during a limited period of time, in certain circumstances. you can opt-out
          from a consent already given, without this withdrawal affecting the lawfulness of the processing operations
          already carried out. when technically feasible, you can ask us to send you the personal information you
          provided us or that we communicate it to a third party. you can ask us to delete your personal information if
          it meets legal grounds for which it is applicable. These rights can be exercised directly and at any time by
          sending an email to https://makerkit.dev or on our Data Requests page. In the case you are our customer&apos;s
          end user, please take into consideration that this request will be forwarded and must be answered directly by
          them.
          <HeadingText>13. Children's privacy</HeadingText>
          Our Services are not intended for use by children under the age of 13 (" Children"). We do not knowingly
          collect personally identifiable information from Children under 13. If you become aware that a Child has
          provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data
          from Children without verification of parental consent, we take steps to remove that information from our
          servers.
          <HeadingText>14. Policy changes</HeadingText>
          This Privacy Policy may be modified in the future to keep it updated with legal jurisprudence and evolution.
          You'll be informed either by a special mention on this page or by a personalized warning, by email for
          instance.
          <HeadingText>15. Contact us</HeadingText>
          If you have any questions about this Privacy Policy, please contact us via email at {app.support.email}.
        </ParagraphText>
      </Container>
    </Section>
  )
}