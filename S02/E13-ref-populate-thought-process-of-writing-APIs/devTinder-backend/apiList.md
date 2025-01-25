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

- 1(a) POST /request/send/interested/:toUserId ( of user on feed who is swiped right, fromUserId is already logged in and you can get from token)
  -1(b) POST /request/send/ignored/:toUserId ( of user on feed who is swiped left, fromUserId is already logged in and you can get from token )

- MAKING STATUS(interested/ignored dynamic)
- 1(a+b) POST /request/send/:status/:toUserId (1ST SWIPE RIGHT/LEFT)

- 2(a) POST /request/review/accepted/:requestId
- 2(b) POST /request/review/rejected/:requestId

- MAKING STATUS(accepted/rejected dynamic)
- 2(a+b) POST /request/review/:status/:requestId (2ND SWIPE RIGHT/LEFT)

## userRouter

- GET /user/requests/received (received)
- GET /user/connections (matches)
- GET /user/feed (gets you the profiles of other users on platforms)

Status: ignored(left-swipe by sender), interested(right-swipe by sender), accepted(right swipe by receiver), rejected(left swipe by receiver)
