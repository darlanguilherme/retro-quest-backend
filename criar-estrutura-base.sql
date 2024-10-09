-- USUARIO
INSERT INTO "main"."User" ("id", "username", "nickname", "passwordHash", "role", "lvl", "experience", "coins", "avatarId") VALUES (1, 'darlan', 'Darlan Guilherme', '$2b$10$dZCFpSjt4M2Lk1ZtT/Mrv.mBHupWi/0YKKToSJcfzmDkL10iE1W62', 'USER', 1, 1750, 800, 15);

-- AVATAR
INSERT INTO "main"."Avatars" ("id", "name", "path", "itemValue") VALUES (1, 'teste', '1.png', NULL);
INSERT INTO "main"."Avatars" ("id", "name", "path", "itemValue") VALUES (2, 'teste', '2.png', NULL);
INSERT INTO "main"."Avatars" ("id", "name", "path", "itemValue") VALUES (3, 'teste', '3.png', NULL);
INSERT INTO "main"."Avatars" ("id", "name", "path", "itemValue") VALUES (4, 'teste', '4.png', NULL);
INSERT INTO "main"."Avatars" ("id", "name", "path", "itemValue") VALUES (5, 'teste', '5.png', NULL);
INSERT INTO "main"."Avatars" ("id", "name", "path", "itemValue") VALUES (6, 'teste', '6.png', NULL);
INSERT INTO "main"."Avatars" ("id", "name", "path", "itemValue") VALUES (7, 'teste', '7.png', NULL);
INSERT INTO "main"."Avatars" ("id", "name", "path", "itemValue") VALUES (8, 'teste', '8.png', 100);
INSERT INTO "main"."Avatars" ("id", "name", "path", "itemValue") VALUES (9, 'teste', '9.png', 100);
INSERT INTO "main"."Avatars" ("id", "name", "path", "itemValue") VALUES (10, 'teste', '10.png', 150);
INSERT INTO "main"."Avatars" ("id", "name", "path", "itemValue") VALUES (11, 'teste', '11.png', 150);
INSERT INTO "main"."Avatars" ("id", "name", "path", "itemValue") VALUES (12, 'teste', '12.png', 200);
INSERT INTO "main"."Avatars" ("id", "name", "path", "itemValue") VALUES (13, 'teste', '13.png', 350);
INSERT INTO "main"."Avatars" ("id", "name", "path", "itemValue") VALUES (14, 'teste', '14.png', 500);
INSERT INTO "main"."Avatars" ("id", "name", "path", "itemValue") VALUES (15, 'teste', '15.png', 700);
INSERT INTO "main"."Avatars" ("id", "name", "path", "itemValue") VALUES (16, 'teste', '16.png', 800);

-- RECOMPENSA
INSERT INTO "main"."Rewards" ("id", "title", "value", "lvlRequired", "avatarId", "createdAt") VALUES (1, 'Avatar', NULL, 1, 1, NULL);
INSERT INTO "main"."Rewards" ("id", "title", "value", "lvlRequired", "avatarId", "createdAt") VALUES (2, 'Coin', 200, 2, NULL, 0);
INSERT INTO "main"."Rewards" ("id", "title", "value", "lvlRequired", "avatarId", "createdAt") VALUES (3, 'Avatar', NULL, 3, 5, 0);
INSERT INTO "main"."Rewards" ("id", "title", "value", "lvlRequired", "avatarId", "createdAt") VALUES (4, 'Coin', 300, 4, NULL, 0);
INSERT INTO "main"."Rewards" ("id", "title", "value", "lvlRequired", "avatarId", "createdAt") VALUES (5, 'Avatar', NULL, 5, 6, 0);
INSERT INTO "main"."Rewards" ("id", "title", "value", "lvlRequired", "avatarId", "createdAt") VALUES (6, 'Coin', 300, 6, NULL, 0);
INSERT INTO "main"."Rewards" ("id", "title", "value", "lvlRequired", "avatarId", "createdAt") VALUES (7, 'Avatar', NULL, 7, 7, 0);
INSERT INTO "main"."Rewards" ("id", "title", "value", "lvlRequired", "avatarId", "createdAt") VALUES (8, 'Coin', 400, 8, NULL, 0);
INSERT INTO "main"."Rewards" ("id", "title", "value", "lvlRequired", "avatarId", "createdAt") VALUES (9, 'Avatar', NULL, 9, 9, 0);

