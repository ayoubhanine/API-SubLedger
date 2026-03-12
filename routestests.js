//1 -Routes Auth (inscription et login)
POST /auth/register  
POST /auth/login         //  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjJhODY0ZTJiMDc3MjM3YzRkMjAyZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzczMzE2MjI1LCJleHAiOjE3NzM0MDI2MjV9.tSLP8jwRxWrWKb9hpNmq4k3M9Yqq6SndTjomrb5QY5M

//2-Routes Subscriptions (utilisateur connecté)

// Garde ce token pour tester les routes protégées
//1 creer un abonnement  POST /subscriptions
//2 afficher abonnement dun user GET /subscriptions
//3 modifier un abonnement PUT /subscriptions/:id
// 4 afficher un abonneent par son id GET/subscriptions/:id
// 5 supprimer un abonnement DELETE /subscriptions/:id

// 3. Routes Admin
 POST /auth/register   // avec role : admin
 POST /auth/login 

 //1️⃣ Voir tous les utilisateurs
 GET /admin/users

 // 2 voir tous les abonnements 
 GET /admin/subscriptions






// 1️⃣ POST /auth/register
// 2️⃣ POST /auth/login
// 3️⃣ Copier le token
// 4️⃣ POST /subscriptions
// 5️⃣ GET /subscriptions
// 6️⃣ PUT /subscriptions/:id
// 7️⃣ DELETE /subscriptions/:id
// 8️⃣ Login avec admin
// 9️⃣ GET /admin/users
// 🔟 GET /admin/subscriptions
