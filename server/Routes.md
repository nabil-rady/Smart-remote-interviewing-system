# Hire Mi Server

## Login <POST> /user/login

## Create account <POST> /user/sign-up

## LOGOUT <POST> /user/logout

## userDashboard <GET> /user

## editUserInfo <PUT> /user/edit/user-id

## createListing <POST> /listing/craete

## generateLink <POST> [listingId, interviweeEmai] /listing/generate

### Response firstName, lastName, listings, companyName, e-mail.

## LISTING <GET> /listing/listing-id

### Response interviews

## INTERVIEW <GET> /interview/interview-id

### Response firstName, lastName, email, videos, submittedAt

## interviweSession /interviwe/session/listing_id/user_hashed_email
