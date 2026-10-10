# Shilpa Kanodia Face Yoga --- Membership, Live Classes & Replay System

## Detailed Product Requirements and Implementation Plan

**Document status:** Draft for technical scoping\
**Project:** Extend the existing custom-coded React/Next.js website\
**Primary outcome:** Members can purchase a plan, book face-yoga
classes, attend live classes inside the website, and watch eligible
missed-class recordings for seven days.

------------------------------------------------------------------------

## 1. Executive Summary

Build a membership and class-management system into Shilpa Kanodia's
existing website. The website remains the primary client experience.
Clients should not need to navigate to a separate Zoom website or app
for the normal live-class flow, subject to browser/device compatibility
with the embedded Zoom Meeting SDK.

The system will include:

1.  Monthly and annual memberships.
2.  Optional class-credit packages, such as a 25-class package or an
    18-month package with a clearly defined credit allowance.
3.  A class calendar and booking flow.
4.  An embedded live-class page powered by Zoom Meeting SDK for Web.
5.  Membership, booking, and credit checks before joining a class.
6.  Recording processing and transfer from Zoom cloud recording to
    private video hosting.
7.  Private replay playback inside the member portal, available for
    exactly seven days from a clearly defined release time.
8.  An admin area where Shilpa or authorized staff can create classes,
    manage members, review attendance, and troubleshoot recordings.
9.  Secure payment processing, server-side authorization, email
    notifications, audit logs, and operational monitoring.

This is a custom integration, not a collection of plug-ins that
automatically work together. A developer must connect the services and
test their failure cases.

## 2. Goals and Non-Goals

### 2.1 Goals

-   Keep the customer journey on Shilpa's website for membership,
    booking, live attendance, and replay viewing.
-   Make access depend on verified payment status and membership
    entitlement.
-   Prevent a member from booking more classes than their plan allows.
-   Give eligible members replay access for seven days.
-   Give Shilpa a simple admin interface for day-to-day operations.
-   Make the experience usable on current desktop and mobile browsers.
-   Keep API secrets, payment verification, entitlement checks, and
    video authorization on the server.
-   Provide clear error messages and recovery paths when a payment,
    meeting, or recording fails.

### 2.2 Non-goals for the first release

Unless separately approved, the first release does not need: - A native
iOS or Android app. - A custom video-conferencing engine built from
scratch. - AI-based face analysis or health recommendations. - A complex
community/social network. - Automated WhatsApp messaging. - Multiple
instructors with complex payroll or revenue sharing. - Downloadable
replay files for members. - DRM that promises to prevent all screen
recording. No browser-based system can guarantee that a viewer cannot
record the screen.

## 3. Recommended Technology

The final selection should be confirmed against the existing codebase,
current vendor plans, pricing, data residency requirements, and account
capabilities before implementation.

  -------------------------------------------------------------------------
  Area                    Recommended starting    Responsibility
                          point                   
  ----------------------- ----------------------- -------------------------
  Website                 Existing React/Next.js  Member and admin user
                          application             interfaces

  Backend                 Next.js server          Secure business logic and
                          routes/server actions   integrations
                          or a separate API       
                          service                 

  Payments                Razorpay                Checkout, recurring
                                                  billing where supported,
                                                  payment status and
                                                  refunds

  Database                PostgreSQL through      Users, plans,
                          Supabase or the         entitlements, classes,
                          project's existing      bookings, attendance and
                          database                replay metadata

  Authentication          Existing authentication Sign-in, sessions and
                          if suitable; otherwise  account recovery
                          Supabase Auth or        
                          equivalent              

  Live classes            Zoom Meeting SDK for    Embedded live meeting
                          Web                     experience

  Recordings              Zoom cloud recording    Original meeting
                                                  recording and
                                                  recording-ready events

  Replay hosting          Mux or another private  Streaming video within
                          video host with signed  the website
                          playback                

  Emails                  Resend or an existing   Receipts/notifications,
                          transactional email     booking reminders and
                          service                 replay
                                                  availability/expiry

  Background jobs         Scheduled job/queue     Retry recording transfer,
                          supported by the        expire entitlements and
                          hosting platform        reconcile failed jobs

  Monitoring              Application error       Diagnose payment,
                          tracking and structured meeting, email and
                          logs                    recording failures
  -------------------------------------------------------------------------

### Vendor and account checks

Before development begins, verify: - The existing Zoom plan supports
cloud recording and the intended number/duration of meetings. - The Zoom
Meeting SDK account setup, credentials, SDK terms and any relevant
licensing requirements. - The selected video provider supports private
assets, signed playback, deletion and the expected streaming volume. -
Razorpay supports the intended subscription model and payment methods
for the business's account. A class pack may be a one-time payment
rather than a recurring subscription. - The website host supports
server-side secrets, webhooks, scheduled jobs and the necessary
execution limits. - Any existing database/authentication setup can be
reused without weakening security.

Do not promise that every device can join every embedded meeting
identically. Validate the Zoom SDK experience on the supported browsers
and devices during a technical proof of concept.

## 4. User Roles and Permissions

### 4.1 Visitor

-   View public class information and plan descriptions.
-   Create an account or sign in.
-   Purchase an available plan.
-   Read the recording, privacy, cancellation and membership terms.

### 4.2 Member

-   View their own active plan and expiry date.
-   View remaining class credits, if the plan uses credits.
-   Browse the class calendar.
-   Book or cancel classes according to policy.
-   Join a class when authorized.
-   View their own booking and attendance history.
-   Watch only the replays for which they are eligible and which remain
    within their access window.
-   View payment history and manage subscription cancellation where
    supported.

### 4.3 Instructor/Host

-   View assigned classes.
-   Start or host the meeting using the configured host workflow.
-   View the class roster.
-   Mark attendance or correct attendance where permitted.
-   Review recording status.

### 4.4 Administrator

-   Create, edit, publish, cancel and reschedule classes.
-   Set class capacity and booking/cancellation deadlines.
-   Attach the appropriate Zoom meeting.
-   View member status, bookings, credits, payment status and
    attendance.
-   Grant or revoke exceptional access with a recorded reason.
-   Review recording processing and transfer status.
-   Retry failed recording jobs.
-   Issue approved refunds or coordinate them through the payment
    dashboard.
-   Review audit events.

Use role-based permissions. An ordinary member must never be able to
access another member's account, payment details, booking history or
replay entitlements.

## 5. Membership and Payment Requirements

### 5.1 Supported product types

The system should support configurable plan types:

**Monthly membership** - Recurring billing at the configured monthly
price. - Entitlement starts when the first payment is verified. -
Renewal is handled through the chosen payment provider. - Access changes
according to verified renewal, cancellation, grace-period and expiry
rules.

**Annual membership** - Recurring annual billing where supported and
explicitly enabled. - Entitlement starts when the first payment is
verified. - Renewal and cancellation status must be reflected in the
dashboard.

**Class-credit package** - One-time payment grants a specified number of
credits, for example 25. - Package has a defined validity period, for
example 12 months. - Credits decrease according to the booking policy. -
Package expiry and unused-credit rules are disclosed before payment.

**18-month package** - Must explicitly state whether it is recurring or
paid upfront. - Must specify the total class credits or whether
attendance is unlimited. - Must specify the start date, expiry date,
cancellation/refund terms and renewal behaviour. - Do not implement an
"18-month plan" until the business confirms these details.

Plan prices, tax treatment, currency, validity, credit allowance and
cancellation rules must be configurable rather than hard-coded.

### 5.2 Payment lifecycle

1.  Member selects a plan.
2.  Backend creates a checkout order or subscription with the payment
    provider.
3.  Member completes checkout.
4.  The provider sends a signed webhook to the backend.
5.  Backend verifies the webhook signature and event details.
6.  Backend processes the event idempotently so repeated events do not
    grant duplicate access or credits.
7.  A successful verified payment activates or renews the appropriate
    entitlement.
8.  Member sees the plan status and relevant credits/expiry in their
    dashboard.
9.  A failed, disputed, refunded or cancelled payment follows a
    documented policy.
10. The system sends the relevant notification.

**Never grant membership solely because the browser redirects to a
"payment successful" page.** The backend must verify the provider's
event or independently confirm the payment.

### 5.3 Failed payments and cancellations

The business must choose a grace-period policy. Suggested starting
behaviour: - Mark a renewal as `past_due` when a renewal fails. - Notify
the member and provide a way to update payment details. - Allow a
configurable grace period, for example three days, if Shilpa approves. -
Restrict new bookings/live joining after the grace period if payment
remains unresolved. - Do not delete historical receipts, bookings or
attendance. - If a member cancels a recurring plan, distinguish "cancel
at period end" from "immediate cancellation." - Define whether any
refund restores class credits and how partial refunds affect access. -
Process provider webhooks idempotently and reconcile uncertain payment
states.

### 5.4 Entitlement states

Use explicit states rather than a single Boolean such as `isPaid`: -
`pending` - `active` - `past_due` - `cancel_at_period_end` - `expired` -
`suspended` - `refunded` (where appropriate)

Access rules should consider the entitlement state, current validity
window, payment state, plan type and any relevant class-credit balance.

## 6. Class Scheduling and Booking

### 6.1 Class data

Each class should have: - Title and description. - Instructor/host. -
Start time and end time. - Time zone, with the business's default time
zone clearly configured. - Capacity. - Booking open/close times. -
Cancellation deadline. - Class status: draft, published, full,
cancelled, completed. - Zoom meeting reference and host configuration. -
Recording expected/available status. - Optional level, focus area,
equipment and preparation instructions.

Store timestamps in UTC and display them in the user's intended time
zone. Avoid hard-coded offsets because daylight-saving changes can
affect users outside India.

### 6.2 Booking flow

1.  Member opens the class calendar.
2.  The server checks account and entitlement status.
3.  The server checks class capacity and booking deadlines.
4.  If the plan uses credits, the system reserves one credit atomically.
5.  The booking is created with a clear status.
6.  The member receives confirmation and sees the class on their
    dashboard.
7.  The system sends a reminder according to configured timings.
8.  On cancellation, the system applies the published credit-return
    policy.
9.  The system prevents duplicate bookings and prevents overselling the
    last seat under concurrent requests.

### 6.3 Credit accounting

Do not simply subtract a credit on a client-side click. Use a
server-side ledger or transactional credit operations.

Suggested ledger event types: - `package_granted` - `booking_reserved` -
`booking_cancelled_credit_returned` - `attendance_consumed` if the
business chooses to consume only after attendance - `admin_adjustment` -
`refund_reversal` - `package_expired`

The product owner must decide when a credit is finally consumed: - **At
booking:** simple, with credits returned for timely cancellations. -
**At attendance:** more flexible, but requires reliable attendance
reconciliation and no-show rules.

Recommended initial policy: reserve a credit at booking; return it for
cancellations made before the stated deadline; apply the stated
no-show/late-cancellation rule consistently. Confirm the policy before
launch.

## 7. Embedded Live-Class Experience

### 7.1 Member-facing page

Suggested route: `/my-classes/live/[classId]`

The page should include: - Class title, instructor and scheduled time. -
Clear pre-join status. - Membership verification state. - Join/start
control when the session is available. - Embedded Zoom Meeting SDK
experience. - Microphone and camera controls where supported. -
Leave-class control with confirmation if appropriate. -
Connection/loading/reconnecting/error states. - Help link and fallback
instructions. - Recording notice and consent information. - Session
timer and class status. - A clear message if the class has not started,
has ended or the member is not eligible.

Do not display a fake timer or assume that a member is attending merely
because the page is open. Separate the scheduled class clock, elapsed
session time and actual attendance status.

### 7.2 Secure join authorization

When a member presses Join: 1. Authenticate the user on the server. 2.
Load the class and member entitlement. 3. Check the current time against
the allowed join window. 4. Check whether the class is published and not
cancelled. 5. Check that the user is booked or otherwise eligible under
the plan. 6. Check capacity/meeting policy if applicable. 7. Create a
short-lived SDK authorization signature on the server. 8. Return only
the required meeting details and signature to the authorized client. 9.
Log the authorization decision without logging secrets.

Never expose the Zoom SDK secret, payment gateway secret or webhook
secret to browser code. A client-side route guard is not sufficient; all
sensitive API operations must enforce authorization on the server.

### 7.3 Browser and device testing

Test: - Current supported Chrome, Safari, Edge and Firefox versions
where the SDK supports them. - iOS Safari and Android Chrome. -
Permission prompts for camera and microphone. - User denying
camera/microphone permissions. - Switching cameras where supported. -
Weak Wi-Fi and temporary disconnections. - Returning from a phone call
or backgrounding the browser. - Joining before the scheduled start,
during the session and after the end. - A member whose subscription
expires shortly before joining. - A member who is logged out or has an
expired session.

If a device/browser cannot use the embedded flow, show a helpful
compatibility message and an approved fallback rather than a broken
blank player. The fallback policy must be decided by the business
because it may send the user outside the website.

## 8. Recording and Seven-Day Replay Requirements

### 8.1 Important architecture

Use Zoom cloud recording as the source recording, then transfer the
processed recording to private video hosting such as Mux. Play the
private hosted version inside the website.

Do not assume that a Zoom cloud recording can simply be placed inside a
normal HTML video player. Confirm the current Zoom recording
capabilities and terms before implementing the transfer workflow.

### 8.2 Recording workflow

1.  Class ends or recording becomes available.
2.  Zoom reports recording readiness through the configured
    event/webhook mechanism.
3.  Backend verifies the event and identifies the class/recording.
4.  A background job retrieves the authorized recording asset.
5.  The job uploads/transfers it to the video provider.
6.  The video provider processes the asset.
7.  Backend receives or polls for processing completion.
8.  Admin dashboard shows the recording as `ready` only when playback
    has been tested or the provider confirms it is playable.
9.  The system creates replay eligibility records for the members who
    qualify.
10. Eligible members receive an email or dashboard notification.
11. The seven-day access window begins at the explicitly defined release
    timestamp.

If transfer or processing fails, retry with backoff, avoid duplicate
assets, and alert the admin after a configured number of failures. Do
not email a replay link before the recording is ready.

### 8.3 Define "missed class" and eligibility

The business must choose one rule before development. Recommended
default: - A member must have a valid booking for that class to receive
its replay. - A member who attended live may also receive replay access
if Shilpa wants this. - A member who did not book the class does not
automatically receive the replay. - An admin may grant an exception,
with a recorded reason.

Attendance can be derived from SDK/session signals where reliable,
supplemented by host/admin corrections. Joining a page is not proof of
attendance. Decide whether attendance means any join, a minimum
duration, or manual host confirmation.

### 8.4 Seven-day expiry definition

Recommended default: **replay access expires exactly seven days after
the recording is marked ready and released to eligible members**, not
seven days after the live class ends. This avoids giving members less
time because recording processing took longer.

For every replay entitlement, store: - `available_from` - `expires_at` -
`recording_id` - `member_id` or qualifying booking reference -
`eligibility_reason` - `status`

Set `expires_at` using server time: `available_from + 7 days`. Store
timestamps in UTC. Display a localized expiry date/time in the UI.

If the business instead wants seven days from class end, that is a
different policy and must be specified before implementation.

### 8.5 Playback authorization

When a member presses Watch Replay: 1. Authenticate the member. 2.
Confirm the replay entitlement belongs to the member or their qualifying
booking. 3. Confirm the recording is ready and not deleted. 4. Confirm
server time is earlier than `expires_at`. 5. Generate a short-lived
signed playback token/URL. 6. Return it to the authorized player. 7.
Refuse new playback authorization after the seven-day entitlement
expires.

The short playback token may expire in minutes; the entitlement lasts
seven days. These are separate controls. Never make a permanent public
playback URL available to all users.

A previously issued token may remain usable until its own expiry. Keep
token duration short and ensure the backend will not issue new tokens
after entitlement expiry. Configure provider-side expiry/deletion where
supported, but do not depend solely on scheduled deletion to enforce
member access.

### 8.6 Recording privacy and consent

-   Notify participants that sessions may be recorded.
-   Obtain any required consent before recording.
-   Restrict access to recordings and limit administrative access.
-   Do not publish meeting cloud-recording links in public pages.
-   Define retention and deletion periods for source recordings and
    replay copies.
-   Provide a contact path for privacy/access questions.
-   Do not claim that the system can prevent all screen recording or
    redistribution.

## 9. Admin Dashboard

Suggested route: `/admin`

### 9.1 Dashboard overview

-   Upcoming classes.
-   Classes in progress.
-   Number of bookings and available seats.
-   Memberships active, expiring, past due and expired.
-   Recordings processing, ready or failed.
-   Recent payment and system events.

### 9.2 Class management

-   Create/edit/publish/cancel/reschedule a class.
-   Configure date, time, duration, capacity and booking deadlines.
-   Attach a Zoom meeting using a secure host workflow.
-   View roster and booking statuses.
-   View attendance and make documented corrections.
-   See recording processing status and replay release time.

### 9.3 Member management

-   Search members.
-   View plan and entitlement state.
-   View credit ledger and bookings.
-   View payment references/status without storing unnecessary card
    data.
-   Grant or revoke access only with an admin permission and audit
    reason.
-   Avoid exposing full payment credentials or unrelated private data.

### 9.4 Recording management

-   See transfer/processing progress.
-   Retry failed jobs.
-   Release a recording after confirming it is ready.
-   Inspect eligible replay counts and expiry timestamps.
-   Revoke a replay when there is a valid operational or privacy reason.
-   Delete recordings according to the retention policy.

## 10. Suggested Database Model

Names can be adjusted to fit the existing schema. Use foreign keys,
indexes, transactions and constraints as appropriate.

### `profiles`

-   `id`
-   `auth_user_id`
-   `name`
-   `email`
-   `role`
-   `created_at`
-   `updated_at`

### `plans`

-   `id`
-   `name`
-   `plan_type` (`monthly`, `annual`, `class_pack`, `custom_term`)
-   `price_amount`
-   `currency`
-   `billing_interval`
-   `validity_days` or explicit term rule
-   `class_credit_allowance` (nullable for unlimited plans)
-   `booking_policy_id`
-   `is_active`
-   `created_at`
-   `updated_at`

### `memberships`

-   `id`
-   `member_id`
-   `plan_id`
-   `status`
-   `provider_customer_id`
-   `provider_subscription_id` (nullable for one-time packages)
-   `current_period_start`
-   `current_period_end`
-   `cancel_at_period_end`
-   `created_at`
-   `updated_at`

### `payments`

-   `id`
-   `member_id`
-   `membership_id`
-   `provider_payment_id`
-   `provider_order_id`
-   `amount`
-   `currency`
-   `status`
-   `event_idempotency_key`
-   `created_at`
-   `updated_at`

### `classes`

-   `id`
-   `title`
-   `description`
-   `instructor_id`
-   `starts_at`
-   `ends_at`
-   `timezone`
-   `capacity`
-   `booking_opens_at`
-   `booking_closes_at`
-   `cancellation_deadline`
-   `status`
-   `zoom_meeting_id` (securely managed)
-   `recording_status`
-   `created_at`
-   `updated_at`

### `bookings`

-   `id`
-   `class_id`
-   `member_id`
-   `status`
-   `credit_reservation_id` (nullable)
-   `booked_at`
-   `cancelled_at`
-   `cancellation_reason`
-   `created_at`
-   `updated_at`

Add a unique constraint to prevent duplicate active bookings for the
same member/class. Enforce capacity and credit reservation inside a
transaction.

### `credit_ledger`

-   `id`
-   `member_id`
-   `membership_id`
-   `booking_id` (nullable)
-   `event_type`
-   `credit_delta`
-   `reason`
-   `created_by`
-   `idempotency_key`
-   `created_at`

The displayed credit balance should be derived from a reliable ledger or
maintained transactionally with reconciliation checks.

### `attendance`

-   `id`
-   `class_id`
-   `member_id`
-   `booking_id`
-   `joined_at`
-   `left_at`
-   `duration_seconds`
-   `attendance_status`
-   `source`
-   `admin_override_reason`
-   `created_at`

### `recordings`

-   `id`
-   `class_id`
-   `source_provider`
-   `source_recording_id`
-   `video_provider_asset_id`
-   `playback_asset_id`
-   `status`
-   `duration_seconds`
-   `ready_at`
-   `created_at`
-   `updated_at`

### `replay_entitlements`

-   `id`
-   `recording_id`
-   `member_id`
-   `booking_id`
-   `eligibility_reason`
-   `available_from`
-   `expires_at`
-   `status`
-   `created_at`
-   `revoked_at`

Add indexes on class start times, member bookings, membership status,
replay expiry and provider IDs. Use database-level access policies where
available, but do not rely on front-end filtering as the security
boundary.

### `webhook_events`

-   `id`
-   `provider`
-   `provider_event_id`
-   `event_type`
-   `received_at`
-   `processed_at`
-   `processing_status`
-   `attempt_count`
-   `last_error`

Use a unique constraint on provider/event ID to prevent duplicate
processing.

### `audit_logs`

-   `id`
-   `actor_id`
-   `action`
-   `target_type`
-   `target_id`
-   `reason`
-   `metadata_redacted`
-   `created_at`

Do not store secrets, SDK signatures, access tokens or unnecessary
sensitive information in logs.

## 11. Backend/API Requirements

Exact route names may differ depending on the existing application
architecture.

### Member and payment APIs

-   `POST /api/checkout` --- create a payment order or subscription
    server-side.
-   `POST /api/webhooks/razorpay` --- verify and process payment events.
-   `GET /api/me/membership` --- return the signed-in member's plan and
    entitlement.
-   `GET /api/me/credits` --- return the member's current credit balance
    and ledger summary.
-   `POST /api/membership/cancel` --- request cancellation according to
    provider and business policy.

### Class and booking APIs

-   `GET /api/classes` --- return published classes.
-   `GET /api/classes/:id` --- return class details visible to the
    member.
-   `POST /api/classes/:id/book` --- authorize and reserve a seat/credit
    transactionally.
-   `POST /api/bookings/:id/cancel` --- apply the cancellation policy.
-   `POST /api/classes/:id/join-token` --- authorize the member and
    return a short-lived SDK signature/meeting payload.

### Recording and replay APIs

-   `POST /api/webhooks/zoom` --- verify and process Zoom events.
-   `POST /api/webhooks/video-provider` --- process video processing
    events where supported.
-   `GET /api/me/replays` --- list only the signed-in member's eligible
    replays.
-   `POST /api/replays/:id/playback-token` --- authorize replay access
    and return short-lived playback authorization.
-   `POST /api/admin/recordings/:id/retry` --- retry a failed recording
    workflow with admin authorization.

### Admin APIs

-   `POST /api/admin/classes`
-   `PATCH /api/admin/classes/:id`
-   `POST /api/admin/classes/:id/cancel`
-   `GET /api/admin/classes/:id/roster`
-   `PATCH /api/admin/attendance/:id`
-   `GET /api/admin/members`
-   `PATCH /api/admin/members/:id/entitlement`
-   `GET /api/admin/recordings`

Every endpoint must validate input, authenticate the caller, enforce
role/ownership rules, return safe error messages and write appropriate
audit events. Rate-limit sensitive endpoints.

## 12. Background Jobs and Reliability

Use a queue or durable job mechanism for tasks that must survive server
restarts: - Recording-ready processing. - Recording
download/transfer/upload. - Video-provider processing checks. - Replay
entitlement creation. - Class reminders. - Replay availability and
expiry notifications. - Failed-payment follow-up. - Subscription
reconciliation. - Recording retention/deletion. - Daily checks for
inconsistent balances or missing assets.

Each job should be idempotent, retryable, observable and safe to run
more than once. Use exponential backoff for transient errors. Failed
jobs must be visible in the admin dashboard or monitoring system rather
than silently disappearing.

Expiry enforcement must occur in the playback-authorization API on every
request. A scheduled expiry job may update display state and send
notices, but it must not be the only security mechanism.

## 13. Notifications

Configure templates for: - Account verification and password recovery. -
Purchase/payment confirmation. - Subscription renewal success or
failure. - Upcoming class reminders. - Booking and cancellation
confirmation. - Class rescheduling/cancellation. - Recording
ready/replay available. - Replay expiry reminder, for example 24 hours
before expiry. - Replay expired. - Support or system issue notice.

Avoid sending Zoom host credentials or private source-recording URLs in
emails. For live classes, direct members to the authenticated class page
on the website.

## 14. User Interface Requirements

### Member portal

Suggested routes: - `/plans` - `/checkout` - `/my-classes` -
`/my-classes/calendar` - `/my-classes/live/[classId]` -
`/my-classes/replays` - `/my-membership` - `/account/payments` -
`/account/settings`

Dashboard information: - Membership status and expiry. - Remaining
credits where applicable. - Next booked class. - Join button available
only during the configured join window. - Booking and cancellation
status. - Replay cards with release and expiry dates. - Clear
explanations for access denied, failed payment and unavailable
recordings.

### Embedded live-class page

-   Instructor/class title and scheduled time.
-   Verified access state.
-   Embedded Zoom Meeting SDK experience.
-   Camera/microphone controls supported by the SDK.
-   Session status and timer.
-   Network/reconnection feedback.
-   Leave control.
-   Recording notice.
-   Help/support link.
-   Responsive layout and accessible keyboard/focus behaviour.

### Replay page

-   Recording title, class date and duration.
-   Embedded private video player.
-   "Available until" timestamp and optional countdown.
-   Loading, processing, expired and unavailable states.
-   No permanent public video URL.
-   Helpful message after expiry and link to upcoming classes.

### Admin portal

-   Calendar/class editor.
-   Roster and attendance.
-   Member lookup and membership state.
-   Payment and credit history.
-   Recording processing status and retry controls.
-   Audit trail for manual changes.

## 15. Security and Privacy

Minimum controls: - Store credentials only in server-side environment
variables or a managed secrets vault. - Use HTTPS everywhere. - Verify
Razorpay and Zoom webhook signatures using the current official
procedures. - Treat all webhook processing as untrusted until signature
verification succeeds. - Use idempotency keys and unique event IDs. -
Enforce member ownership and admin roles on every protected endpoint. -
Use short-lived, signed playback tokens for private recordings. - Never
expose source cloud-recording URLs publicly. - Use secure, HttpOnly,
appropriately configured cookies for sessions. - Protect against CSRF
where relevant, XSS, injection and insecure direct-object references. -
Rate-limit login, booking, token generation and sensitive admin
actions. - Redact secrets and personal data from logs. - Keep an audit
log of manual access changes. - Define backups, restore testing,
incident response and retention/deletion policies. - Obtain and record
the necessary consent for recording participants. - Publish
understandable privacy, refund, cancellation and recording terms.

## 16. Testing and Acceptance Criteria

### 16.1 Membership and payments

**Monthly and annual plans** - A verified successful payment activates
the correct plan. - The dashboard shows correct validity dates and
renewal status. - Renewal success extends entitlement exactly once. - A
duplicate webhook does not duplicate a payment, membership or credit
grant. - A failed payment moves the membership into the configured state
and triggers the expected notification. - Cancellation at period end
preserves access until the stated date. - Immediate cancellation,
refunds and chargebacks follow the approved rules.

**Class credits** - A 25-credit package grants exactly 25 credits after
verified payment. - Two simultaneous booking attempts cannot spend the
same final credit. - A successful booking reserves one credit according
to policy. - A permitted cancellation restores the credit exactly
once. - A late cancellation/no-show follows the published policy. - An
admin adjustment records the actor, amount and reason. - Expired
packages cannot be used to make new bookings.

### 16.2 Live classes

-   An eligible, booked member can join during the permitted window.
-   An expired or suspended member cannot join.
-   A member without the required booking/entitlement cannot join.
-   A logged-out user cannot obtain a join token.
-   A member cannot change a class ID to enter another unauthorized
    meeting.
-   SDK credentials are never exposed to the browser.
-   Camera/microphone permission success and denial are handled
    gracefully.
-   Mobile and desktop browser tests pass for the declared support
    matrix.
-   Network interruptions display a recovery state.
-   A cancelled or completed class cannot be joined as though it were
    live.

### 16.3 Missed-class recordings

-   A recording is not published before processing completes.
-   The transfer process is retryable and does not create duplicate
    replay assets.
-   Only eligible members receive replay entitlements.
-   An eligible member can watch the replay inside the website.
-   A non-eligible member receives a safe access-denied response.
-   A replay token is short-lived.
-   The server refuses new playback tokens at and after `expires_at`.
-   The exact seven-day rule is tested using controlled timestamps,
    including timezone boundaries.
-   The system continues to deny access even if an old replay card
    remains visible in the browser.
-   Failed recording transfers alert an administrator.
-   Replay deletion and retention policies are tested.

### 16.4 Admin and security

-   Only authorized staff can create, edit or cancel classes.
-   Members can see only their own bookings, payments and replay
    entitlements.
-   Manual credit/access changes require permission and an audit reason.
-   Webhook signature failures are rejected.
-   Duplicate webhook events are safely ignored.
-   Database access policies and server authorization are tested.
-   Secrets are absent from client bundles, browser responses and logs.
-   Backup restoration and production error monitoring are verified.

## 17. Delivery Plan and Milestones

A four-to-six-week delivery target is reasonable for a focused
implementation, subject to codebase quality, vendor setup, design
readiness and test results.

### Phase 0 --- Discovery and proof of concept (2--4 days)

-   Review existing Next.js architecture, deployment, authentication and
    database.
-   Confirm payment-provider and Zoom accounts.
-   Validate Zoom SDK joining on target mobile browsers.
-   Validate Zoom recording retrieval and private video-hosting
    playback.
-   Confirm plan rules, class-credit policy, attendance definition and
    replay expiry rule.
-   Deliver architecture, risks, data model and final scope.

**Exit condition:** the team has demonstrated that live meetings can be
embedded on target devices and that a private recording can be played
within the website.

### Phase 1 --- Foundation and membership (Week 1)

-   Configure database migrations and authentication.
-   Implement roles and protected routes.
-   Create plan, membership, payment and credit-ledger models.
-   Integrate checkout and verified payment webhooks.
-   Implement idempotent payment handling.
-   Build member membership dashboard.

**Exit condition:** test purchases activate the correct membership and
credit balance.

### Phase 2 --- Class scheduling and booking (Week 2)

-   Build admin class calendar and class editor.
-   Implement member calendar and class detail pages.
-   Implement capacity checks and transactional booking.
-   Implement cancellation and credit-return rules.
-   Implement reminders and booking history.

**Exit condition:** members can book/cancel within policy and the
roster/credit ledger remains consistent under concurrent tests.

### Phase 3 --- Embedded live classes (Week 3)

-   Configure Zoom Meeting SDK.
-   Implement server-side authorization signatures.
-   Build embedded live-class UI and device permission states.
-   Implement join windows and entitlement checks.
-   Implement attendance collection and admin correction.
-   Test mobile/desktop browser support and reconnect behaviour.

**Exit condition:** authorized members can join and unauthorized members
are blocked on every protected path.

### Phase 4 --- Recording and replay workflow (Week 4)

-   Configure Zoom recording events and secure recording retrieval.
-   Build background recording transfer job.
-   Integrate private video hosting and playback.
-   Create replay entitlements after assets are ready.
-   Implement seven-day server-enforced expiry.
-   Add replay notification and failure retry/alerting.

**Exit condition:** a completed class produces a private replay that
eligible members can watch inside the website and that becomes
inaccessible after seven days.

### Phase 5 --- Hardening and launch (Weeks 5--6, if needed)

-   Complete security, payment and entitlement edge-case tests.
-   Test browser/device matrix.
-   Run admin training and a small pilot class.
-   Monitor webhook delivery, recording transfers and playback errors.
-   Fix issues and document support procedures.
-   Launch gradually and review metrics after the first live sessions.

**Exit condition:** all launch acceptance criteria pass, rollback and
support procedures are documented, and Shilpa approves the pilot.

## 18. Operational Dashboard and Monitoring

Track: - Payment webhook success/failure and processing latency. -
Checkout-to-activation success rate. - Memberships past due and
expiring. - Booking failures and capacity conflicts. - Join
authorization failures. - SDK connection errors where observable. -
Recording-ready event delay. - Recording transfer and processing failure
rate. - Replay playback authorization denials. - Replays that are ready
but lack entitlements. - Email delivery/bounce failures. - Credit-ledger
reconciliation differences.

Set alerts for repeated webhook failures, recording transfer failures,
missing replay assets, unexpectedly high join errors and inconsistent
credit balances.

## 19. Risks and Mitigations

  -----------------------------------------------------------------------
  Risk                                Mitigation
  ----------------------------------- -----------------------------------
  Embedded Zoom behaviour differs     Run a proof of concept and publish
  across browsers                     a tested browser support matrix

  Zoom plan or SDK constraints change Verify account/licensing
  the design                          requirements before committing

  Recording processing is delayed     Start the replay window only at the
                                      approved release point; alert on
                                      delays

  Duplicate webhooks grant duplicate  Unique provider event IDs,
  credits                             idempotency and transactional
                                      processing

  Concurrent bookings oversell        Database transactions and capacity
  capacity                            constraints

  Old replay URLs are shared          Private playback, short-lived
                                      signed tokens and server-side
                                      entitlement checks

  Payment fails but UI shows active   Backend webhook verification and
                                      periodic reconciliation

  Members dispute no-show deductions  Clear policy, reliable attendance
                                      records and admin correction audit
                                      trail

  Video costs rise unexpectedly       Usage monitoring, retention rules
                                      and monthly streaming reports

  A staff account is compromised      Strong authentication, least
                                      privilege, audit logs and recovery
                                      procedures
  -----------------------------------------------------------------------

## 20. Decisions Required from Shilpa Before Development

These are business decisions, not assumptions the developer should
silently make:

1.  What are the exact monthly and annual prices?
2.  Are monthly and annual plans unlimited or credit-limited?
3.  Is the 25-class package valid for 12 months?
4.  What exactly does the 18-month plan include, and is it paid upfront
    or recurring?
5.  When is a credit consumed: booking, attendance or after the
    cancellation deadline?
6.  What is the cancellation deadline and no-show policy?
7.  Who qualifies for a missed-class replay: only booked non-attendees,
    all booked members, or all members?
8.  Should the seven-day window start when the recording is
    ready/released or at a fixed time after the class?
9.  Can members who attended live also watch the replay?
10. How long should original Zoom recordings be retained after replay
    access expires?
11. Should the class be recorded automatically, and how will
    participants consent?
12. What should happen if Zoom embedding fails on a member's device?
13. Which email address and support channel should handle technical
    issues?
14. Who is authorized to issue refunds or manually grant access?
15. What existing website hosting, database, authentication and payment
    setup must be preserved?

## 21. Definition of Done

The project is complete only when all of the following are true:

-   [ ] Monthly and annual plans work.
-   [ ] Class-pack credits are tracked accurately.
-   [ ] Failed payments and cancellations update access correctly.
-   [ ] Members can join live classes inside the website on supported
    devices.
-   [ ] Expired or ineligible members are blocked server-side.
-   [ ] Camera and microphone flows work on the supported mobile and
    desktop browsers.
-   [ ] Recordings become available only after processing is complete.
-   [ ] Eligible members can watch replays inside the website.
-   [ ] Replay access expires exactly seven days after the agreed
    release timestamp.
-   [ ] Shilpa can create and manage classes.
-   [ ] Attendance and class credits are visible and auditable.
-   [ ] API secrets stay server-side and recordings remain private.
-   [ ] Webhook retries, recording failures and payment edge cases are
    tested.
-   [ ] Backup, monitoring, support and rollback procedures are
    documented.
-   [ ] Shilpa approves a pilot class before general launch.

------------------------------------------------------------------------

## Recommended Final Architecture

**Existing Next.js website + Razorpay + PostgreSQL/Supabase + Zoom
Meeting SDK for Web + private video hosting (such as Mux) +
transactional email + durable background jobs.**

Keep the first release focused on the paid membership lifecycle, class
booking, embedded live attendance and seven-day private replays. Add
advanced analytics, WhatsApp reminders and other enhancements only after
the core workflow is stable.

**Important:** this plan is a technical specification and implementation
roadmap. It is not evidence that the integrations have already been
configured or tested. Verify current provider documentation, account
entitlements, pricing and SDK behaviour during the discovery phase
before production implementation.
