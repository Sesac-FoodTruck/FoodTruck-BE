-- 사용자 테이블 생성
CREATE TABLE `member` (
  `id` varchar(50) NOT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `profileimg` text,
  `social_id` text NOT NULL,
  `social_code` int NOT NULL,
  `social_token` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 매장분류 테이블 생성
CREATE TABLE `foodcategory` (
  `categoryid` int NOT NULL,
  `categoryname` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`categoryid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 매장 테이블 생성
CREATE TABLE `store` (
  `storeno` INT NOT NULL AUTO_INCREMENT,
  `storename` VARCHAR(50) NOT NULL,
  `storetime` VARCHAR(50) DEFAULT NULL,
  `categoryid` INT NOT NULL,
  `storeweek` VARCHAR(50) DEFAULT NULL,
  `photos` text DEFAULT NULL,
  `contact` VARCHAR(20) DEFAULT NULL,
  `account` VARCHAR(30) DEFAULT NULL,
  `payment` varchar(30) DEFAULT NULL,
  `latitude` FLOAT NOT NULL,
  `longitude` FLOAT NOT NULL,
  `confirmed` INT(11) NOT NULL,
  `id` varchar(50) NOT NULL,
  `reportcount` int DEFAULT NULL,
  PRIMARY KEY (`storeno`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- 매장메뉴 생성
CREATE TABLE `item` (
  `itemid` INT NOT NULL AUTO_INCREMENT,
  `itemname` VARCHAR(45) NOT NULL,
  `itemimgurl` VARCHAR(45) NULL,
  `iteminformation` VARCHAR(45) NULL,
  `itemprice` INT NULL,
  `storeno` INT NOT NULL, -- store 테이블의 storeno와 연결되는 외래 키
  PRIMARY KEY (`itemid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 매장 review
CREATE TABLE `review` (
  `reviewno` int NOT NULL AUTO_INCREMENT,
  `id` varchar(50) NOT NULL,
  `storeno` int NOT NULL,
  `storecontent` varchar(50) CHARACTER SET utf8 NOT NULL,
  `rating` int NOT NULL,
  `revietime` datetime NOT NULL,
  PRIMARY KEY (`reviewno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 매장 report
CREATE TABLE `report` (
  `reportno` int NOT NULL AUTO_INCREMENT,
  `id` varchar(50) NOT NULL,
  `storeno` int NOT NULL,
  PRIMARY KEY (`reportno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- like 테이블 생성
CREATE TABLE `like` (
  `likeno` int NOT NULL AUTO_INCREMENT,
  `id` varchar(50) NOT NULL,
  `storeno` int NOT NULL,
  PRIMARY KEY (`likeno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 사용자 테이블 생성
CREATE TABLE `favorite` (
  `favoriteno` int NOT NULL AUTO_INCREMENT,
  `id` varchar(50) NOT NULL,
  `favoriteLatitude` FLOAT NOT NULL,
  `favoriteLongitude` FLOAT NOT NULL,
  `location_code` varchar(50) NOT NULL,
  PRIMARY KEY (`favoriteno`),
  FOREIGN KEY (`id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- sample data 입력
-- Insert sample data into 'member' table
INSERT INTO `member` (`id`, `nickname`, `profileimg`, `social_id`, `social_code`, `social_token`) VALUES
('d41a74e1-985a-43d8-92c9-67ab2c7d7e9f', '먹순이', '/images/members/d41a74e1-985a-43d8-92c9-67ab2c7d7e9f.jpg', 'john@gmail.com', 1, 'G-abcdef123456'),
('6f8eab40-7f0a-4c15-8bc3-d5d99d30be60', '조인성', '/images/members/6f8eab40-7f0a-4c15-8bc3-d5d99d30be60.jpg', 'alice@kakao.com', 2, 'K-123456abcdef'),
('b04f6ff6-22b3-48c8-b6f9-7a8468cf9099', '차태현', '/images/members/b04f6ff6-22b3-48c8-b6f9-7a8468cf9099.jpg', 'bob@gmail.com', 1, 'G-789xyz987654'),
('a1d36768-5f9a-4ab3-99e1-3f8d66adff51', '한소희', '/images/members/a1d36768-5f9a-4ab3-99e1-3f8d66adff51.jpg', 'eva@gmail.com', 1, 'G-abc123xyz789'),
('7c2e9db8-3ac2-4822-bf93-1d22c5f139bc', '박서준', '/images/members/7c2e9db8-3ac2-4822-bf93-1d22c5f139bc.jpg', 'mike@gmail.com', 1, 'G-xyz987abc123'),
('d6c78083-28e4-4b61-a8f6-c1e0a189d0af', '김고은', '/images/members/d6c78083-28e4-4b61-a8f6-c1e0a189d0af.jpg', 'sara@kakao.com', 2, 'K-abcdef654321'),
('b0d23e64-4c2d-46dd-b71d-d9d1f933d87d', '김유신', NULL, 'daniel@kakao.com', 2, 'K-123abc456def'),
('9aee8a47-8c53-4c61-8ee9-245ab25165e5', '박형식', NULL, 'olivia@gmail.com', 1, 'G-654321fedcba'),
('c35df8e2-5d8b-46ef-bd08-9c614c4db07d', '김다미', NULL, 'lucas@kakao.com', 2, 'K-def456abc123'),
('44a191bf-7f3a-49e0-8e38-c5c3dd4a096e', '김태리', NULL, 'sophia@kakao.com', 2, 'K-456def123abc');

-- Insert sample data for the `foodcategory` tablegit 
INSERT INTO `foodcategory` (`categoryid`, `categoryname`) VALUES
    (1, '야식'),
    (2, '샐러드'),
    (3, '빵집'),
    (4, '분식'),
    (5, '카페'),
    (6, '도시락'),
    (7, '한식'),
    (8, '양식'),
    (9, '남미음식'),
    (10, '아시아음식');

-- Insert sample data into 'store' table
INSERT INTO `store` (`storename`, `storetime`, `categoryid`, `storeweek`, `photos`, `contact`, `account`, `payment`, `latitude`, `longitude`, `confirmed`, `id`, `reportcount`) VALUES
    ('장한평역 샌드위치', '9:00 AM - 6:00 PM', 1, '월화수목금토', 'photo1.jpg', '123-456-7890', '1006-500-066982/우리은행/이산', 'oxx', 37.56144, 127.064623, '1', 'a1d36768-5f9a-4ab3-99e1-3f8d66adff51', 0),
    ('새싹 빈대떡', '8:00 AM - 6:00 PM', 2, '월수금토일', 'photo2.jpg', '987-654-3210', '1006-500-066982/신한은행/홍범도', 'ooo', 37.56151, 127.064333, '1','d6c78083-28e4-4b61-a8f6-c1e0a189d0af', 2),
    ('장한 닭발', '10:00 AM - 7:00 PM', 3, '월화수목금토일', 'photo3.jpg', '555-555-5555', '1006-500-066982/신한은행/홍범도', 'oxo', 37.56179, 127.064222, '0', '9aee8a47-8c53-4c61-8ee9-245ab25165e5', 0),
    ('테슬라 황금붕어빵', '11:00 AM - 8:00 PM', 4, '월화수목금', 'photo4.jpg', '999-999-9999', '1006-500-066982/신한은행/홍범도', 'ooo', 37.56118, 127.064721, '0','c35df8e2-5d8b-46ef-bd08-9c614c4db07d', 0),
    ('선식당 스테이크', '7:00 AM - 9:00 PM', 5, '월수금', 'photo5.jpg', '111-111-1111', '1006-500-066982/신한은행/홍범도', 'oxo', 37.56178, 127.064894, 0, 'a1d36768-5f9a-4ab3-99e1-3f8d66adff51', 0),
    ('장한평역 1번출구', '9:00 AM - 9:00 PM', 1, '월화수목금토', 'photo1.jpg', '123-456-7890', '1006-500-066982/신한은행/홍범도', 'oxo', 37.56188, 127.064543, '0','a1d36768-5f9a-4ab3-99e1-3f8d66adff51', 0),
    ('SESAC 호떡', '8:00 AM - 5:00 PM', 2, '월수금토일', 'photo2.jpg', '987-654-3210', '1006-500-066982/우리은행/김두한', 'oxx', 37.56186, 127.064642, '1','d6c78083-28e4-4b61-a8f6-c1e0a189d0af', 1),
    ('장한 닭발', '10:00 AM - 7:00 PM', 3, '월화수목금토일', 'photo3.jpg', '555-555-5555', '1006-500-066982/신한은행/윤선도', 'oxo', 37.56199, 127.010853, '0','9aee8a47-8c53-4c61-8ee9-245ab25165e5', 6),
    ('중고 붕어빵', '11:00 AM - 8:00 PM', 4, '월화수목금', 'photo4.jpg', '999-999-9999', '1006-500-066982/우리은행/윤이상', 'oxx', 37.56102, 127.064876, '1','c35df8e2-5d8b-46ef-bd08-9c614c4db07d', 3),
    ('길거리 스테이크', '7:00 AM - 4:00 PM', 5, '월수금', 'photo5.jpg', '111-111-1111', '1006-500-066982/신한은행/아이유', 'xoo', 37.511357, 127.064678, '0','a1d36768-5f9a-4ab3-99e1-3f8d66adff51', 2),
    ('신당 국수집', '9:00 AM - 9:00 PM', 6, '월화수목금', 'photo6.jpg', '222-222-2222', '1006-500-066982/우리은행/김범수', 'xoo', 37.565799, 127.01731, '0','d41a74e1-985a-43d8-92c9-67ab2c7d7e9f', 1),
    ('중앙시장 등갈비', '8:00 AM - 8:00 PM', 7, '월수목토일', 'photo7.jpg', '333-333-3333', '1006-500-066982/신한은행/홍범도', 'oxx', 37.565555, 127.01766, '0','a1d36768-5f9a-4ab3-99e1-3f8d66adff51', 0),
    ('전기구이 통닭', '10:00 AM - 7:00 PM', 8, '토일', 'photo8.jpg', '444-444-4444', '1006-500-066982/신한은행/홍범도', 'oxx', 37.565891, 127.01776, '1','b0d23e64-4c2d-46dd-b71d-d9d1f933d87d', 0),
    ('카페 시장', '11:00 AM - 8:00 PM', 9, '월화수목금', 'photo9.jpg', '666-666-6666', '1006-500-066982/신한은행/홍범도','oxo', 37.565921, 127.01791, '1','c35df8e2-5d8b-46ef-bd08-9c614c4db07d', 0),
    ('신당 닭강정', '7:00 AM - 4:00 PM', 10, '월화수목금토일', 'photo10.jpg', '777-777-7777', '1006-500-066982/신한은행/홍범도', 'oox', 37.515864, 127.01747, '0','44a191bf-7f3a-49e0-8e38-c5c3dd4a096e', 0),
    ('신당역 앞 붕어빵', '9:00 AM - 6:00 PM', 6, '월화수목금', 'photo6.jpg', '222-222-2222', '1006-500-066982/신한은행/홍범도', 'xoo', 37.515865, 127.01771, '0','d41a74e1-985a-43d8-92c9-67ab2c7d7e9f', 0),
    ('중앙시장 잔치국수', '8:00 AM - 5:00 PM', 7, '월수목토일', 'photo7.jpg', '333-333-3333', '1006-500-066982/신한은행/홍범도', 'xoo', 37.565246, 127.01702, '0','a1d36768-5f9a-4ab3-99e1-3f8d66adff51', 1),
    ('감자 핫도그', '10:00 AM - 7:00 PM', 8, '토일', 'photo8.jpg', '444-444-4444', '1006-500-066982/신한은행/홍범도', 'xoo', 37.565123, 127.01055, '0','b0d23e64-4c2d-46dd-b71d-d9d1f933d87d', 2),
    ('카페 청년다방', '11:00 AM - 8:00 PM', 9, '월화수목금', 'photo9.jpg', '666-666-6666', '1006-500-066982/신한은행/홍범도', 'xoo', 37.565001, 127.01722, '0','c35df8e2-5d8b-46ef-bd08-9c614c4db07d', 8),
    ('신당 닭발', '7:00 AM - 4:00 PM', 10, '월화수목금토일', 'photo10.jpg', '777-777-7777', '1006-500-066982/신한은행/홍범도', 'ooo', 37.565072, 127.01702, '0','44a191bf-7f3a-49e0-8e38-c5c3dd4a096e', 7);

-- 'item' 테이블에 샘플 데이터 삽입
INSERT INTO `item` (`itemname`, `itemimgurl`, `iteminformation`, `itemprice`, `storeno`) VALUES
  ('햄버거', 'img_url_1', '맛있는 햄버거', 5000, 11),
  ('피자', 'img_url_2', '이탈리안 피자', 8000, 11),
  ('샌드위치', 'img_url_3', '신선한 샌드위치', 7000, 12),
  ('커피', 'img_url_4', '직접 로스팅한 커피', 4000, 12),
  ('도넛', 'img_url_5', '달콤한 도넛', 3000, 13),
  ('아이스크림', 'img_url_6', '시원한 아이스크림', 2000, 13),
  ('짜장면', 'img_url_7', '고기와 야채로 만든 짜장면', 6000, 14),
  ('핫도그', 'img_url_8', '고소한 핫도그', 3500, 14),
  ('파스타', 'img_url_9', '이탈리안 파스타', 9000, 15),
  ('등갈비', 'img_url_10', '부드러운 등갈비', 12000, 15),
  ('햄버거', 'img_url_1', '맛있는 햄버거', 5000, 16),
  ('피자', 'img_url_2', '이탈리안 피자', 8000, 17),
  ('샌드위치', 'img_url_3', '신선한 샌드위치', 7000, 17),
  ('커피', 'img_url_4', '직접 로스팅한 커피', 4000, 17),
  ('도넛', 'img_url_5', '달콤한 도넛', 3000, 18),
  ('아이스크림', 'img_url_6', '시원한 아이스크림', 2000, 18),
  ('짜장면', 'img_url_7', '고기와 야채로 만든 짜장면', 6000, 18),
  ('핫도그', 'img_url_8', '고소한 핫도그', 3500, 19),
  ('파스타', 'img_url_9', '이탈리안 파스타', 9000, 19),
  ('등갈비', 'img_url_10', '부드러운 등갈비', 12000, 20),
  ('햄버거', 'img_url_1', '맛있는 햄버거', 5000, 20),
  ('피자', 'img_url_2', '이탈리안 피자', 8000, 21),
  ('샌드위치', 'img_url_3', '신선한 샌드위치', 7000, 21),
  ('커피', 'img_url_4', '직접 로스팅한 커피', 4000, 21),
  ('도넛', 'img_url_5', '달콤한 도넛', 3000, 22),
  ('아이스크림', 'img_url_6', '시원한 아이스크림', 2000, 23),
  ('짜장면', 'img_url_7', '고기와 야채로 만든 짜장면', 6000, 23),
  ('핫도그', 'img_url_8', '고소한 핫도그', 3500, 24),
  ('파스타', 'img_url_9', '이탈리안 파스타', 9000, 25),
   ('핫도그', 'img_url_8', '고소한 핫도그', 3500, 25),
  ('파스타', 'img_url_9', '이탈리안 파스타', 9000, 26),
  ('등갈비', 'img_url_10', '부드러운 등갈비', 12000, 26),
  ('햄버거', 'img_url_1', '맛있는 햄버거', 5000, 26),
  ('피자', 'img_url_2', '이탈리안 피자', 8000, 27),
  ('샌드위치', 'img_url_3', '신선한 샌드위치', 7000, 27),
  ('커피', 'img_url_4', '직접 로스팅한 커피', 4000, 28),
  ('도넛', 'img_url_5', '달콤한 도넛', 3000, 28),
  ('아이스크림', 'img_url_6', '시원한 아이스크림', 2000, 28),
  ('짜장면', 'img_url_7', '고기와 야채로 만든 짜장면', 6000, 29),
  ('핫도그', 'img_url_8', '고소한 핫도그', 3500, 29),
  ('파스타', 'img_url_9', '이탈리안 파스타', 9000, 30),
  ('등갈비', 'img_url_10', '부드러운 등갈비', 12000, 30);

  -- Insert sample data into 'review' table
INSERT INTO `review` (`id`, `storeno`, `storecontent`, `rating`, `revietime`) VALUES
    ('b04f6ff6-22b3-48c8-b6f9-7a8468cf9099', 11, '굉장히 맛있음', 1, NOW()),
    ('b04f6ff6-22b3-48c8-b6f9-7a8468cf9099', 11, '따뜻할때 먹을때 맛이 최고', 4, NOW()),
    ('d41a74e1-985a-43d8-92c9-67ab2c7d7e9f', 12, '최고의 거리음식!', 3, NOW()),
    ('6f8eab40-7f0a-4c15-8bc3-d5d99d30be60', 14, '매일 먹어도 안질려!', 5, NOW()),
    ('44a191bf-7f3a-49e0-8e38-c5c3dd4a096e', 15, '이 음식 대단하다!', 5, NOW()),
    ('7c2e9db8-3ac2-4822-bf93-1d22c5f139bc', 15, '환상적인 거리의 한상차림!', 3, NOW()),
    ('7c2e9db8-3ac2-4822-bf93-1d22c5f139bc', 17, '최고다!', 4, NOW()),
    ('d6c78083-28e4-4b61-a8f6-c1e0a189d0af', 18, '이보다 맛있을수 없다.', 4, NOW()),
    ('d6c78083-28e4-4b61-a8f6-c1e0a189d0af', 18, '얌얌~맛집보장!', 5, NOW()),
    ('9aee8a47-8c53-4c61-8ee9-245ab25165e5', 19, '올해의 거리음식!', 4, NOW());

-- Insert sample data into 'report' table
INSERT INTO `report` (`id`, `storeno`) VALUES
    ('44a191bf-7f3a-49e0-8e38-c5c3dd4a096e', 11),
    ('44a191bf-7f3a-49e0-8e38-c5c3dd4a096e', 11),
    ('d6c78083-28e4-4b61-a8f6-c1e0a189d0af', 11),
    ('d6c78083-28e4-4b61-a8f6-c1e0a189d0af', 13),
    ('d6c78083-28e4-4b61-a8f6-c1e0a189d0af', 15),
    ('44a191bf-7f3a-49e0-8e38-c5c3dd4a096e', 15),
    ('c35df8e2-5d8b-46ef-bd08-9c614c4db07d', 16),
    ('d6c78083-28e4-4b61-a8f6-c1e0a189d0af', 16),
    ('7c2e9db8-3ac2-4822-bf93-1d22c5f139bc', 18),
    ('7c2e9db8-3ac2-4822-bf93-1d22c5f139bc', 18);
    
-- Insert sample data into 'like' table
INSERT INTO `like` (`id`, `storeno`) VALUES
    ('d41a74e1-985a-43d8-92c9-67ab2c7d7e9f', 11),
    ('d41a74e1-985a-43d8-92c9-67ab2c7d7e9f', 13),
    ('d41a74e1-985a-43d8-92c9-67ab2c7d7e9f', 13),
    ('b04f6ff6-22b3-48c8-b6f9-7a8468cf9099', 14),
    ('9aee8a47-8c53-4c61-8ee9-245ab25165e5', 17),
    ('9aee8a47-8c53-4c61-8ee9-245ab25165e5', 17),
    ('44a191bf-7f3a-49e0-8e38-c5c3dd4a096e', 17),
    ('44a191bf-7f3a-49e0-8e38-c5c3dd4a096e', 18),
    ('44a191bf-7f3a-49e0-8e38-c5c3dd4a096e', 18),
    ('b0d23e64-4c2d-46dd-b71d-d9d1f933d87d', 18);

-- Insert sample data into 'favorite' table
INSERT INTO `favorite` (`id`, `favoriteLatitude`, `favoriteLongitude`, `location_code`) VALUES
    ('44a191bf-7f3a-49e0-8e38-c5c3dd4a096e', 37.568071, 127.054374, 'office'),
    ('44a191bf-7f3a-49e0-8e38-c5c3dd4a096e', 37.567680, 127.053881, 'myplace'),
    ('a1d36768-5f9a-4ab3-99e1-3f8d66adff51', 37.567039, 127.053072,'myplace'),
    ('c35df8e2-5d8b-46ef-bd08-9c614c4db07d', 37.567039, 127.058072,'home'),
    ('9aee8a47-8c53-4c61-8ee9-245ab25165e5', 37.563519, 127.053677,'home'),
    ('d6c78083-28e4-4b61-a8f6-c1e0a189d0af', 37.567219, 127.013677,'myplace'),
    ('d6c78083-28e4-4b61-a8f6-c1e0a189d0af', 37.567519, 127.053077,'home'),
    ('a1d36768-5f9a-4ab3-99e1-3f8d66adff51', 37.567334, 127.053445,'office'),
    ('a1d36768-5f9a-4ab3-99e1-3f8d66adff51', 37.568071, 127.054374,'home');
