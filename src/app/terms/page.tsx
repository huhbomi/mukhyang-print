import LegalDocumentSection, {
  LegalDocumentIntro,
} from "@/components/LegalDocumentSection";
import StaticPageHeader from "@/components/StaticPageHeader";

const listClassName = "list-disc space-y-2 pl-5";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-14">
      <StaticPageHeader title="이용약관" breadcrumbLast="이용약관" />

      <article className="border border-border bg-white px-5 py-6 md:px-10 md:py-10">
        <LegalDocumentIntro>
          본 약관은 묵향인쇄가 운영하는 홈페이지에서 제공하는 서비스의 이용과 관련하여
          묵향인쇄와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
        </LegalDocumentIntro>

        <LegalDocumentSection title="1. 목적">
          <p>
            본 약관은 묵향인쇄 홈페이지 이용과 관련하여 필요한 기본 사항을 정하는
            것을 목적으로 합니다.
          </p>
        </LegalDocumentSection>

        <LegalDocumentSection title="2. 용어의 정의">
          <p>본 약관에서 사용하는 용어의 의미는 다음과 같습니다.</p>
          <ul className={listClassName}>
            <li>홈페이지: 묵향인쇄가 운영하는 웹사이트</li>
            <li>이용자: 홈페이지에 접속하여 서비스를 이용하는 모든 자</li>
            <li>
              서비스: 회사소개, 제품소개, 공지사항, 상담문의 등 홈페이지에서 제공하는
              기능
            </li>
          </ul>
        </LegalDocumentSection>

        <LegalDocumentSection title="3. 약관의 효력 및 변경">
          <p>본 약관은 홈페이지에 게시함으로써 효력이 발생합니다.</p>
          <p>
            묵향인쇄는 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있으며,
            변경된 약관은 홈페이지에 게시한 때부터 효력이 발생합니다.
          </p>
        </LegalDocumentSection>

        <LegalDocumentSection title="4. 서비스의 제공">
          <p>묵향인쇄는 홈페이지를 통해 다음과 같은 서비스를 제공합니다.</p>
          <ul className={listClassName}>
            <li>회사소개</li>
            <li>제품소개</li>
            <li>공지사항 조회</li>
            <li>상담문의 접수</li>
            <li>기타 묵향인쇄가 정하는 서비스</li>
          </ul>
        </LegalDocumentSection>

        <LegalDocumentSection title="5. 이용자의 의무">
          <p>이용자는 홈페이지 이용 시 다음 행위를 하여서는 안 됩니다.</p>
          <ul className={listClassName}>
            <li>허위 정보 등록</li>
            <li>타인의 개인정보 도용</li>
            <li>타인의 권리 침해</li>
            <li>욕설, 비방, 명예훼손성 게시물 등록</li>
            <li>불법 정보 또는 광고성 게시물 등록</li>
            <li>홈페이지 운영을 방해하는 행위</li>
          </ul>
        </LegalDocumentSection>

        <LegalDocumentSection title="6. 상담문의 이용">
          <p>이용자는 상담문의 작성 시 정확한 정보를 입력해야 합니다.</p>
          <p>
            상담문의에 입력된 연락처와 이메일은 문의 답변 및 상담을 위한 목적으로만
            사용됩니다.
          </p>
          <p>
            작성자는 본인이 입력한 비밀번호를 통해 문의글을 확인, 수정, 삭제할 수
            있습니다.
          </p>
        </LegalDocumentSection>

        <LegalDocumentSection title="7. 게시물의 관리">
          <p>묵향인쇄는 다음에 해당하는 게시물을 사전 통보 없이 삭제할 수 있습니다.</p>
          <ul className={listClassName}>
            <li>허위 내용이 포함된 게시물</li>
            <li>타인의 권리를 침해하는 게시물</li>
            <li>욕설, 비방, 명예훼손성 게시물</li>
            <li>광고성 또는 도배성 게시물</li>
            <li>홈페이지 운영에 부적절하다고 판단되는 게시물</li>
          </ul>
        </LegalDocumentSection>

        <LegalDocumentSection title="8. 개인정보 보호">
          <p>
            묵향인쇄는 이용자의 개인정보를 관련 법령에 따라 보호하며, 개인정보 처리에
            관한 사항은 개인정보처리방침에 따릅니다.
          </p>
        </LegalDocumentSection>

        <LegalDocumentSection title="9. 서비스 이용 제한">
          <p>
            묵향인쇄는 이용자가 본 약관을 위반하거나 홈페이지 운영을 방해하는 경우
            서비스 이용을 제한할 수 있습니다.
          </p>
        </LegalDocumentSection>

        <LegalDocumentSection title="10. 서비스 중단">
          <p>
            묵향인쇄는 다음의 경우 홈페이지 서비스 제공을 일시적으로 중단할 수
            있습니다.
          </p>
          <ul className={listClassName}>
            <li>시스템 점검</li>
            <li>서버 장애</li>
            <li>통신 장애</li>
            <li>천재지변 등 불가항력적인 사유</li>
            <li>기타 운영상 필요한 경우</li>
          </ul>
        </LegalDocumentSection>

        <LegalDocumentSection title="11. 면책조항">
          <p>
            묵향인쇄는 천재지변, 시스템 장애, 통신 장애 등 불가항력적인 사유로 인한
            서비스 중단에 대하여 책임을 지지 않습니다.
          </p>
          <p>이용자의 귀책사유로 발생한 문제에 대해서는 책임을 지지 않습니다.</p>
          <p>
            홈페이지에 게시된 정보는 안내 목적이며, 실제 견적 및 제작 조건은 상담을
            통해 확정됩니다.
          </p>
        </LegalDocumentSection>

        <LegalDocumentSection title="12. 준거법 및 관할">
          <p>본 약관은 대한민국 법령에 따라 해석됩니다.</p>
          <p>
            홈페이지 이용과 관련하여 분쟁이 발생할 경우 묵향인쇄 소재지를 관할하는
            법원을 관할 법원으로 합니다.
          </p>
        </LegalDocumentSection>

        <LegalDocumentSection title="부칙">
          <p>본 약관은 게시일로부터 시행합니다.</p>
        </LegalDocumentSection>
      </article>
    </div>
  );
}
