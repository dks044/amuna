<div align=center><h1><a href="https://amuna.vercel.app/">AMUNA</a></h1></div>
<div align=center>
  <img width="581" alt="image" src="https://github.com/user-attachments/assets/d4a701ef-4442-4d47-a01a-99b45b7edcb4">
</div>

<div align=center>
    <h1>관심사를 통해 소통하는 채팅 웹 사이트</h1>
</div>
<br>
<div>
    <ul>
      <li><em><strong>24.9.27 ~ 24.10.21</strong></em></li>
      <li><strong>Project-StoryBoard :</strong> <a href="https://www.notion.so/1141eacaea3880c884c9edfb16e9abf8?pvs=21">https://buly.kr/6Xl5EDn</a></li>
    </ul>
</div>
<br>

<div align=center>
    <h1 id="목차">🔎 목차</h1>
    <h4><a href="#tech-stacks">0. 🛠 사용 기술</a></h4>
    <h4><a href="#기획-배경">1. 🎯 배경 </a></h4>
    <h4><a href="#주요-아키텍처">2. ⚙ 주요 아키텍처</a></h4>
    <h4><a href="#주요-기능">3. ⭐️ 주요 기능 </a></h4>
    <h4><a href="#erd">4. 💾 ERD </a></h4>
    <h4><a href="#트러블슈팅">5. 💡 트러블슈팅 </a></h4>
</div>
<br>

---

<br><br>

<div>
    <h1 id="tech-stacks">0. 🛠 사용 기술 </h1>
    <div label="NEXTJS">
      <img alt="Static Badge" src="https://img.shields.io/badge/typescript-%233178C6?style=for-the-badge&logo=typescript&logoColor=white">
      <img alt="Static Badge" src="https://img.shields.io/badge/nextjs-%23000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
      <img alt="Static Badge" src="https://img.shields.io/badge/nextauth-%23000000?style=for-the-badge&logo=auth0&logoColor=white">
    </div>
    <div label="DATABASE">
      <img alt="Static Badge" src="https://img.shields.io/badge/mongodb-%2347A248?style=for-the-badge&logo=mongodb&logoColor=white">
      <img alt="Static Badge" src="https://img.shields.io/badge/redis-%23FF4438?style=for-the-badge&logo=redis&logoColor=white">
      <img alt="Static Badge" src="https://img.shields.io/badge/prisma-%232D3748?style=for-the-badge&logo=prisma&logoColor=white">
    </div>
    <div label="FRONTEND">
      <img alt="Static Badge" src="https://img.shields.io/badge/tailwindcss-%2306B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
      <img alt="Static Badge" src="https://img.shields.io/badge/Framermotion-%230055FF?style=for-the-badge&logo=Framer&logoColor=white">
      <img alt="Static Badge" src="https://img.shields.io/badge/Zustand-%23FF3621?style=for-the-badge&logo=databricks&logoColor=white">
      <img alt="Static Badge" src="https://img.shields.io/badge/react_hook_form-%23E5122E?style=for-the-badge&logo=formspree&logoColor=white">
      <img alt="Static Badge" src="https://img.shields.io/badge/axios-%235A29E4?style=for-the-badge&logo=axios&logoColor=white">
      <img alt="Static Badge" src="https://img.shields.io/badge/headlessui-%2366E3FF?style=for-the-badge&logo=headlessui&logoColor=white&color=WHITE">
    </div>
    <div label="OTHER">
      <img alt="Static Badge" src="https://img.shields.io/badge/pusher-%23300D4F?style=for-the-badge&logo=pusher&logoColor=white">
      <img alt="Static Badge" src="https://img.shields.io/badge/cloudinary-%233448C5?style=for-the-badge&logo=cloudinary&logoColor=white">
      <img alt="Static Badge" src="https://img.shields.io/badge/NODEMAILER-%23005FF9?style=for-the-badge&logo=maildotru&logoColor=white">
    </div>
    <br>
    <h5><a href="#목차">🔎 목차로 이동 </a> </h5>
</div>

<br><br>

<div>
    <h1 id="기획-배경">1. 🎯 기획 배경 </h1>
    <p>본 프로젝트는 기존의 익숙한 반이중 통신(RestAPI) 개발 경험에서 탈피하고자</p>
    <p>저에게 새로운 경험이자, 기술인</p>
    <p><strong>전이중 통신(Socket) 구조의 개발 경험</strong>을  통해 성장하고자 시작되었고, </p>
    <p>WebSocket 기술을 활용한 기능 개발에 초점을 맞추어</p>
    <p>Amuna 프로젝트를 개발하였습니다.</p>
    <p>이를 통해 NoSQL 데이터베이스에 대한 이해도를 높이고, Prisma를 활용하여 NoSQL을 객체 지향 문법으로 다루는 방법을 익혔습니다.</p>
    <p>또한, 필요에 따라 MSA(Microservices Architecture) 환경을 구축하기 위해</p>
    <p>Cloudinary, Redis, Pusher, Atlas와 같은 클라우드 서비스를 활용하였습니다.</p>
    <br>
    <h5><a href="#목차">🔎 목차로 이동 </a> </h5>
</div>

<br><br>

<div>
    <h1 id="주요-아키텍처">2. ⚙ 주요 아키텍처 </h1>
    <h2>시스템 아키텍처</h2>
    <div align=center>
      <img src="https://github.com/user-attachments/assets/62c99094-f6ab-4711-8b6c-fac75cdfd4de" alt="시스템아키텍처">
    </div>
  
  - **Next.js:**
    - **Vercel에 배포되어 클라우드 환경에서 실행됩니다.**
  - **MongoDB Atlas:**
      - 클라우드 기반 NoSQL 데이터베이스로, 애플리케이션의 주요 데이터 저장소 역할을 합니다.
      - MongoDB의 클러스터를 **개발 환경을 구성할 떄 부터** 클라우드 서버에 설치함으로써, 프로덕션 환경에서도 따로 구성할 필요 없었고, 이는 개발 과정의 피로도를 많이 줄였습니다.
  - **Redis:**
      - 인메모리 데이터 저장소로, 캐싱 및 세션 관리를 담당합니다.
      - 사용자 온라인&오프라인 유무 및 이메일 인증 로직을 위해 사용했고,
      Redis클라우드 서버에 설치했습니다.
  - **Prisma:**
      - 데이터베이스와의 상호작용을 위한 ORM(Object-Relational Mapping) 도구로, MongoDB와 Redis를 효과적으로 연동합니다.
      - 현재 프로젝트의 API 에서 데이터 베이스와 상호작용이 필요한 비즈니스 로직들은
      전부 Prisma 를 활용해서 구현했습니다.
  - **Cloudinary:**
      - 이미지 및 미디어 파일의 업로드, 저장 및 변환을 위한 클라우드 서비스입니다.
      - 사용자 프로필, 오픈채팅방 썸네일, 채팅 이미지 등 저장되는 장소 입니다.
    <br>
    <h2>보안 아키텍처</h2>
    <div align=center>
      <img src="https://github.com/user-attachments/assets/37ef4365-cb78-4c21-8589-1b256b196d6f" alt="보안아키텍처">
    </div>

    - **사용자 인증:**
      - **소셜 로그인 (OAuth):** 구글, 깃허브와 같은 신뢰할 수 있는 제3자를 통해 안전하게 사용자 정보를 획득합니다.
      - **이메일 로그인:** 사용자 제공 이메일과 비밀번호로 인증을 진행하며, 비밀번호는 bcrypt로 해싱하여 저장합니다.
    - **JWT (JSON Web Token) 관리:**
      - **발급:** 로그인 성공 시 JWT를 생성하여 사용자에게 제공합니다.
      - **수명 관리:** 토큰의 기본 유효 기간은 24시간이며, 활성 사용자의 경우 2시간마다 자동 갱신되어 보안과 사용자 경험을 동시에 개선합니다.
    - **이메일 인증 프로세스:**
      - **Redis 활용:** 빠른 읽기/쓰기 성능을 제공하는 Redis를 이용해 이메일 인증 과정을 처리합니다.
        Redis를 활용하여 무분별한 이메일들의 회원가입 방지를 할 수 있었습니다.
    - **데이터 저장 및 관리:**
      - **MongoDB (Atlas):** 사용자 데이터를 안전하게 클라우드 환경에 저장합니다.
      - **Prisma ORM:** 객체 지향적 방식으로 데이터베이스와 상호작용하며, 타입 안정성을 보장합니다.
    - **세션 및 인증 흐름 관리:**
      - **NextAuth:** 세션과 JWT를 효과적으로 관리하며, 토큰에 중요 정보(예: 사용자 ID)를 안전하게 포함시킵니다.
      - 전체 인증 프로세스는 보안을 최우선으로 하되, **사용자 경험을 해치지 않도록 최적화**되어 있습니다.(Oauth, 이메일 인증)
    <br>
    <br>
    <h2>채팅 아키텍처</h2>
    <div align=center>
      <img src="https://github.com/user-attachments/assets/37663bc4-ad56-49e3-9a54-8a1304d86aec" alt="채팅아키텍처 ">
    </div>

    <h3 id="Pusher-">Pusher</h3>
    <ul>
        <li>
            <strong>Pusher Server:</strong> 실시간 데이터 전송을 담당합니다. 사용자가 채팅 메시지를 전송하면, Pusher Server는 WebSocket 프로토콜을 기반으로 지연 없이 해당 메시지를 즉시 다른 클라이언트에게 전달합니다.
        </li>
        <li>
            <strong>Pusher Client:</strong> 클라이언트 측에서 실시간 이벤트를 구독합니다. 사용자가 채팅방에 접속하면, 클라이언트는 특정 채널을 구독하여 메시지를 수신하고 표시합니다. 이는 사용자 경험을 향상시키고 채팅의 몰입감을 높입니다.
        </li>
    </ul>

    <h3 id="mongodb-atlas-server-">MongoDB (Atlas Server 사용)</h3>
    <p>NoSQL의 특징중 하나로, 데이터는 애플리케이션이 필요로 하는 형식으로 저장되는 특징이 있어,</p>
    <p>이러한 특징을 이용해, 데이터를 읽어오는 속도가 <strong>RDBMS에 비해서 빠르기에 채팅 웹앱에 적합하다고 생각하여 채택</strong>했습니다.</p>

    <ul>
        <li>
            <strong>데이터 저장:</strong> 모든 채팅 기록과 사용자 데이터를 안전하게 저장하는 NoSQL 데이터베이스입니다. JSON과 유사한 BSON 포맷으로 저장되어, 유연성과 확장성이 뛰어납니다.
        </li>
        <li>
            <strong>Prisma ORM:</strong> 객체 지향적 접근으로 데이터베이스와 연동을 관리합니다. 강력한 타입 시스템으로 안전하고 직관적인 데이터베이스 상호작용이 가능합니다. 기본 자바 스프링 개발 경험에서 JPA를 통한 객체지향 문법을 통한 RDBMS를 다룬 경험을 토대로 러닝 커버를 낮추어 접근할 수 있는 기술이지 않을까 하여 설계에 채택했습니다.
        </li>
    </ul>

    <h3 id="cloudinary">Cloudinary</h3>
    <ul>
        <li>
            <strong>이미지 관리:</strong> 사용자가 업로드한 이미지를 처리하고 저장하는 클라우드 서비스입니다. 채팅 메시지와 함께 이미지를 전송할 수 있으며, 업로드된 이미지에 대한 URL을 반환하여 메시지에 포함시킵니다.
        </li>
        <li>
            <strong>최적화:</strong> 자동 이미지 최적화 및 변환 기능을 제공하여, 다양한 디바이스에서 최적의 품질로 이미지를 표시할 수 있도록 지원합니다.
        </li>
    </ul>

    <h3 id="-">사용자 흐름</h3>
    <ul>
        <li>
            <strong>인증:</strong> 사용자는 Next.js 애플리케이션에 로그인 후 채팅방에 접속합니다. JWT 토큰을 통해 안전하게 인증이 처리됩니다.
        </li>
        <li>
            <strong>메시지 전송:</strong> 채팅방에서 사용자는 텍스트 메시지와 이미지를 입력하고 전송합니다. Pusher를 통해 실시간으로 다른 사용자에게 전달됩니다.
        </li>
        <li>
            <strong>데이터 저장 및 조회:</strong> 모든 메시지 및 이미지 데이터는 MongoDB에 안전하게 저장되며, 사용자는 언제든지 채팅 기록을 조회할 수 있습니다. MongoDB의 강력한 쿼리 기능을 활용하여 특정 날짜나 사용자에 따른 필터링이 가능하여 편리한 데이터 접근성을 보장합니다.
        </li>
    </ul>

    <p>이러한 아키텍처는 확장성과 실시간성을 모두 고려한 설계로, 대규모 사용자를 수용할 수 있는 견고한 채팅 시스템의 기반이 됩니다. 향후 기능 확장 시 <strong>메시지 암호화, 읽음 확인, 멀티미디어 지원 등</strong>을 쉽게 추가할 수 있는 유연한 구조를 갖추고 있습니다.</p>

    <br>
    <h5><a href="#목차">🔎 목차로 이동 </a> </h5>

</div>

<br><br>

<div>
    <h1 id="주요-기능">3. ⭐️ 주요 기능 </h1>
<h2 id="-">사용자 온오프라인 기능</h2>
<aside>
<strong>⚙️ 현재 접속한 사용자가 상대방의 온라인&오프라인 유무를 알 수 있는 기능 입니다.</strong>
<br><strong>이 과정에 Pusher, Redis 기술을 적극 활용했습니다.</strong>
</aside>
<br>
<p>애플리케이션 사용자가 채팅 기능을 이용할 때,</p>
<p><strong>상대방의 온라인 및 오프라인 상태를 확인할 수 있는 기능은 채팅 프로젝트에서 중요한 요소</strong>입니다.</p>
<p><em>이는 사용자 경험을 향상시키기 위해 필수적인 기능이라고 생각하여 구현하게 되었습니다.</em></p>
<p>효율성을 고려한 결과, 일반 데이터베이스보다 읽기 속도가 빠르고 캐시 저장소 역할을 하는 Redis를 활용하는 방안을 고안했습니다.</p>
<p>Pusher와 Redis를 사용해서 <strong>접속|비접속시 Redis서버에</strong></p>
<p><strong>사용자ID를 할당</strong>하고, <strong>동시에 사용자ID를 할당&amp;비할당 하는 웹소켓 이벤트를 발행하는 전략을 채택</strong>했고,</p>
<p>전역적으로 타사용자의 온오프라인 유무를 타 컴포넌트에서 공유하기 위해</p>
<p><code>Zustand</code>를 이용했습니다.</p>
<img width="398" alt="temp1" src="https://github.com/user-attachments/assets/edc63167-7456-44ea-b3c8-c61179e58105">
<em>Redis에 사용자ID를 할당하고, 웹소켓 이벤트를 발행하는 서버 코드</em>
<p>접속시(로그인)에</p>
<p>서버에서 사용자의 ID를 Redis에 할당하고, <strong>동시에 사용자의 ID를 할당해주는 이벤트를 발행</strong>합니다.</p>
<div>
  <img width="300" alt="temp2" src="https://github.com/user-attachments/assets/a8348dac-4496-4357-a3af-5f6004c431d3">
  <em>이벤트를 구독하고, 사용자ID를 바인딩 하는 클라이언트 코드</em>
  <img width="300" alt="temp" src="https://github.com/user-attachments/assets/50e17499-9e7a-4852-816f-991ad73f6769">
  <em>사용자 접속해제시, Redis에 사용자ID를 제거하고, 제거한 정보를 바인딩 받는 클라이언트 코드</em>
</div>
<br>
<p>클라이언트에서는 <strong>사용자의 접속 및 비접속 상태</strong>에 따라 <strong>사용자 ID를 할당하고 제거하는 API를 실행</strong>합니다.</p>
<p>이 과정에서 웹소켓 이벤트를 구독하고 바인딩하여 Zustand 저장소에 해당 경과를 기록합니다.</p>
<p>이제 Zustand 저장소에는 접속한 사용자의 ID가 저장되어 있으며, 이를 활용하여</p>
<div>
  <img width="217" alt="temp" src="https://github.com/user-attachments/assets/dc4013cf-f83b-442a-9fbb-010dd3ac8ebe">
  <em>온 오프라인 표시가 필요한 컴포넌트에서 활용하여 <strong>온 오프라인 표시 기능을 구현할 수 있었습니다.</strong></em>
</div>
<br>
<h2 id="-">실시간 채팅</h2>
<p>관련 트러블 슈팅 문서 : <a href="https://ahnjonyun.notion.site/11d1eacaea3880ec9d19e7b2ef5c32ba">https://ahnjonyun.notion.site/11d1eacaea3880ec9d19e7b2ef5c32ba</a></p>
<p>AMUNA 프로젝트는 <strong>관심사를 기반으로 한 실시간 채팅 기능을 핵심 시그니처</strong>로 삼고 있습니다.</p>
<p>이러한 시그니처를 더욱 강화하기 위해, 실시간으로 이루어지는 채팅은 필수적이었습니다.</p>
<p>이에 따라 본 프로젝트에서는 <strong>Next.js, Pusher, MongoDB, 그리고 Cloudinary를 활용하여 실시간 채팅 기</strong>능을 구현하였습니다.</p>
<div>
  <img width="383" alt="temp1" src="https://github.com/user-attachments/assets/e8313070-a34e-4fdf-ac58-8d42d6c5b01c">
  <em>메시지를 생성하는 서버 코드</em>
</div>
<div>
    <img width="538" alt="temp2" src="https://github.com/user-attachments/assets/b8159576-64c7-477a-99c7-f3379115d933">
  <em>메시지를 생성과 동시에 새로운 메시지를 할당하는 이벤트를 발행하는 서버 코드,
마지막 메시지 또한 업데이트 한 정보를  웹소켓 이벤트로 발행한다.</em>
</div>
<br>
<p>서버에서는 채팅 메시지를 생성하는 API를 구현했습니다, 메시지 데이터 생성과 동시에</p>
<p>생성된 메시지 데이터를 할당하는 Pusher이벤트(웹소켓)를 발행하고,</p>
<div>
  <img width="224" alt="temp3" src="https://github.com/user-attachments/assets/7f3ffcb4-c8bb-4a64-9ba8-eae37661ba2a">
  <em>채팅방 데이터의 마지막 메시지가 표시된 스크린샷</em>
</div>
<p><strong>동시에 채팅방의 마지막 메시지를 업데이트 하는 이벤트 또한 발행</strong>합니다.</p>
<div>
  <img width="283" alt="temp" src="https://github.com/user-attachments/assets/cc738f12-60b7-432d-99da-62a0a0b50f1f">
  <em>메시지에 대한 이벤트를 구독하고, 바인딩 받는 클라이언트 코드</em>
</div>
<p>클라이언트 측에서는 <strong>메시지 생성 및 업데이트와 관련된 웹소켓 이벤트를 구독하고 바인딩</strong>합니다.</p>
<p>이를 통해, <strong>해당 컴포넌트의 상태를 실시간으로 업데이트하여 사용자에게 즉각적인 피드백을 제공</strong>합니다.</p>
<p>결과적으로, 채팅 메시지가 표시되는 컴포넌트에서 실시간 채팅 기능을 효과적으로 구현할 수 있었습니다.</p>
<br>
<h2>[추가기능] '채팅을 본 사람 기능'</h2>
<div>
  <img width="369" alt="temp" src="https://github.com/user-attachments/assets/ea7dc62b-3842-4e6e-a28b-c7ec167da368">
  <em>채팅방 클라이언트 컴포넌트 코드</em>
</div>
<p>사용자가 채팅방 진입시,</p>
<p>클라이언트에서는 <strong>해당 채팅방의 메시지목록중에서 마지막 메시지의 본사람(<code>seen</code>)을 업데이트 하는 API를 요청</strong>합니다.</p>
<div>
  <img width="362" alt="temp" src="https://github.com/user-attachments/assets/0f6289ac-752e-42b0-a869-4be76f2b4349">
  <em>특정 채팅방을 찾고 include 옵션을 통해 해당 채팅방의 메시지 데이터를 찾은 후,</em>
</div>
<div>
  <img width="398" alt="temp2" src="https://github.com/user-attachments/assets/38d3ba66-23a3-479a-8c68-488d2e59ae48">
  <em>해당 메시지 배열의 마지막 메시지를 업데이트함( <code>lastMessage</code> )</em>
</div>
<p>해당 API는

마지막 메시지의 `seen` 속성을 업데이트하여,

현재 사용자가 메시지를 본 것으로 기록하고, 이 과정에서 **현재 사용자의 ID를 `seen` 목록에 연결**하여,</p>

<div>
  <img width="159" alt="temp3" src="https://github.com/user-attachments/assets/6e91a462-e210-48df-a647-c3e579932a2e">
  <em> 해당 메시지의 <code>seen</code> 필드를 활용해서 마지막 메시지를 본사람 기능을 구현하는 원리입니다.</em>
</div>
<br>
<h2>1대1 채팅방 생성 & 오픈채팅방 생성</h2>
<div alien=center>
  <img width="300" alt="temp1" src="https://github.com/user-attachments/assets/5658bfa2-9100-4e84-a091-e457a8bb67c3">
  <img width="300" alt="temp2" src="https://github.com/user-attachments/assets/c9096162-2bb8-4f14-9af9-7c85fbe866e0">
</div>
<p>클라이언트에서는 관심사를 바탕으로 사용자 검색 API 를 활용하여 원하는 관심사를 가진 사람과 대화를 할 수 있습니다.</p>
<div alien=center>
  <img width="950" alt="temp3" src="https://github.com/user-attachments/assets/62e28abc-fd55-4fd7-b2ee-222000fdd190">
</div>
<p>채팅방 생성시 상대방의 채팅방 리스트에도 실시간으로 생성됩니다.</p>
<div alien=center>
  <img width="468" alt="temp" src="https://github.com/user-attachments/assets/6b4e0b74-56d8-4998-a5cc-40e5988f3126">
</div>
<p>채팅방 생성 API 실행시, 사용자의 이메일을 채널로 <strong>채팅방을 생성하는 이벤트를 발행</strong>하고,</p>
<div alien=center>
  <img width="296" alt="temp2" src="https://github.com/user-attachments/assets/dec74a84-e7a0-40cf-ba76-ed6cd7a7ebea">
</div>
<p>클라이언트에서는 사용자의 이메일을 채널로 구독하고, <strong> 채팅방을 생성하는 이벤트을 할당받고,</strong></p>
<p><strong>상태값을 업데이트 하여 채팅방 리스트 컴포넌트에 실시간으로 채팅방을 생성</strong>합니다.</p>
<div>
  <img width="600" alt="temp1" src="https://github.com/user-attachments/assets/cb13eb0e-88b6-41ea-931c-aecc8e894baf">
  <img width="276" alt="temp2" src="https://github.com/user-attachments/assets/e5451903-9e41-49a3-bdca-6d4e22e1eac0">
</div>
<div>
  <img width="347" alt="temp3" src="https://github.com/user-attachments/assets/de424bf4-d317-4684-a372-fdcf46694d86">
  <em>오픈채팅방 생성 또한 1대1 채팅방 생성과 비슷한 비즈니스 로직입니다.</em>
  <em>다른점이 있다면 오픈채팅방 리스트는 클라이언트에서 ‘all’ 이라는 이름으로 채널을 구독합니다.</em>
</div>
<br>
<h2>반응형 디자인</h2>
<h3>프론트엔드의 전체적인 스타일링은 <code>TailWindCSS</code> 를 활용했습니다.</h3>
<p>디자인 기획 : <a href="https://www.notion.so/UI-1141eacaea3880a7a060f1e451404ba1?pvs=21">https://ahnjonyun.notion.site/UI-1141eacaea3880a7a060f1e451404ba1</a></p>
<p>사용자 경험은 애플리케이션의 성공에 있어 중요한 요소로 자리 잡고 있습니다.</p>
<p>특히, 채팅 웹앱과 같은 커뮤니케이션 플랫폼에서는 <strong>사용자가 다양한 디바이스에서 편리하게 소통할 수 있는 <br>환경을 제공하는 것이 필수적</strong>입니다.</p>
<p>이를 위해 본 프로젝트에서는 채팅 웹앱의 UI를 반응형으로 디자인 하여 사용자 경험을 증대시키기 위한 노력을 했습니다.</p>
<div>
  <img src="https://github.com/user-attachments/assets/08dcdb00-1238-4255-97d7-a635fe47e7ef" alt="temp1">
  <img src="https://github.com/user-attachments/assets/4f98c2dd-bd70-4e84-9ff4-33a725cfacf0" alt="temp2">
</div>
<p>초기 디자인 기획을 할 떄, <strong>디자인 스케치</strong> 입니다. <strong>해당 디자인 스케치를 기반으로 UI</strong>를 구현했습니다.</p>
<div align=center>
  <img width="555" alt="temp3" src="https://github.com/user-attachments/assets/fd067e4e-2c7a-4098-8ab0-b52851009881">
  <img width="300" alt="temp4" src="https://github.com/user-attachments/assets/0a2b23df-b129-4356-b8f2-8a528f621953">
</div>
<div align=center>
  <img width="557" alt="temp5" src="https://github.com/user-attachments/assets/b5c3a845-6f30-4bf1-ba18-4c8ab1c48853">
  <img width="300" alt="temp6" src="https://github.com/user-attachments/assets/f114184c-d5ac-4b13-a0f7-9b401f6b37bf">
</div>
<div align=center>
  <img width="559" alt="temp7" src="https://github.com/user-attachments/assets/7cf6d803-6ae2-476f-9637-8c8c9d099102">
  <img width="300" alt="temp8" src="https://github.com/user-attachments/assets/d316c8c3-97e3-4331-badb-49afde6b7217">
</div>
<div>
  <img width="443" alt="temp" src="https://github.com/user-attachments/assets/b33e0d1f-a8f4-4c4c-b6c1-4b7ce1e6ba2b">
</div>
<p>데스크톱 모드와 모바일 모드를 <strong>서로 다른 컴포넌트로 나누어 반응형을 구현하였습니다.</strong></p>
<p>데스크톱 모드에서는 Tailwind CSS의 <code>hidden lg:block</code> 클래스를 사용하여,
화면 크기가 &#39;lg&#39; 이상일 때만 해당 컴포넌트가 표시되도록 설정하였습니다. 이는 사용자가 컴퓨터에서 접속할 때 최적화된 UI를 제공하기 위함입니다.</p>
<p>반면, 모바일 모드에서는 <code>lg:hidden</code> 클래스를 사용하여 &#39;lg&#39; 이하의 화면 크기에서만 해당 컴포넌트가 보이도록 설정하였습니다. 
 <em>다른 페이지에서도 동일한 접근 방식을 적용하여 반응형 디자인을 구현하였습니다.</em></p>
<p><em>이러한 구조를 통해, 다양한 화면 크기에서 최적의 사용자 경험을 보장하며,
각 디바이스에 적합한 UI를 효과적으로 제공할 수 있었습니다.</em></p>
<br>
<h2>소셜 로그인 (Oauth)</h2>
<img width="389" alt="temp" src="https://github.com/user-attachments/assets/2fcf889b-2efa-4e2e-8ef0-8dc476cb4bbd">
<p>사용자 경험을 향상시키기 위한 노력 중에서, <strong>간편한 로그인 및 회원가입 과정</strong>은 매우 중요하다고 생각합니다.  로그인 과정이 복잡하고 번거로울수록 사용자 경험에 부정적인 영향을 미치는 경우가 많기 떄문입니다.</p>
<p>따라서 <strong>사용자가 복잡한 인증 절차를 거치지 않고 손쉽게 접근할 수 있는 방법</strong>이 필요하다는 점을 절실히 느꼈습니다. <strong>이 방법을 실현시킬 수 있는 방법이 Oauth(소셜로그인) 이라고 생각하여 해당 기능 구현에 도입</strong>했습니다.</p>
<p>이에 따라, <code>NextAuth.js</code>와 <code>OAuth</code>를 활용하여 <strong>원터치 로그인 기능을 도입</strong>하였습니다.
이 구현을 통해, <strong><em>구글이나 깃허브와 같은 다양한 소셜 플랫폼과의 간편한 인증 연동이 가능해졌습니다.</em></strong></p>
    <br>
    <h5><a href="#목차">🔎 목차로 이동 </a> </h5>
</div>
<br><br>
<div>
    <h1 id="erd">4. 💾 ERD </h1>
    <img src="https://github.com/user-attachments/assets/3819a243-0546-40a9-8b8c-8212bfa34984" alt="image">
      <br>
    <h5><a href="#목차">🔎 목차로 이동 </a> </h5>
</div>
<br><br>
<div>
    <h1 id="트러블슈팅">5. 💡 트러블슈팅 </h1>
    <p><strong>트러블슈팅 문서 모음 :</strong> <a href="https://www.notion.so/1141eacaea3880e384e2f917426e2c4c?pvs=21">https://ahnjonyun.notion.site/1141eacaea3880e384e2f917426e2c4c</a></p>
    <p>AMUNA 프로젝트를 구현하는 과정에서 다양한 문제와 도전에 직면했습니다.
    <br>이러한 경험을 바탕으로 트러블슈팅 문서를 작성하며, 단순히 기능을 개발하는 데 그치지 않고 발생하는
    <br><strong>오류를 해결하고 효율성을 높이기 위해 지속적으로 노력</strong>했습니다. 
    <br><em>이 노력은 앞으로 이후에 발생한 상황을 예방할 수 있는 경험이 될거라고 생각합니다.</em></p>
      <br>
    <h5><a href="#목차">🔎 목차로 이동 </a> </h5>
</div>
