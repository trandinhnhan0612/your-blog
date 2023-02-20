<!-- collection: posts
Add new post
id
title
slug
image
hot post (true or false)
createdAd
status: 1(approved) 2(pending) 3(reject)
content: html => convert to Json.string and to db, then parse to html to render ui
userId
categoryId
  -->

<!-- collection: category
id
name
slug
status: 1(approved) 2(unApproved)
createdAd (time create)
-->

<!-- collection: user
id
userName
avatar: url image_name
email
password
status: 1(active) 2(pending) 3(ban)
role: 1(Admin) 2(Blogger) 3(User)
permission: "ADD_POST"
createdAd
 -->
