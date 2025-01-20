# DevTinder APIs

## authRouter

- POST /signup
- POST /logic
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/interested/:userId ( of user on feed who is swiped right)
- POST /request/send/ignored/:userId ( of user on feed who is swiped left )
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter

- GET /user/connections (matches)
- GET /user/requests (received)
- GET /user/feed (gets you the profiles of other users on platforms)

Status: ignore, interested, accepted, rejected
