import LegalDocumentSection, {
  LegalDocumentIntro,
} from "@/components/LegalDocumentSection";
import StaticPageHeader from "@/components/StaticPageHeader";

const listClassName = "list-disc space-y-2 pl-5";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-14">
      <StaticPageHeader title="개인정보처리방침" breadcrumbLast="개인정보처리방침" />

      <article className="border border-border bg-white px-5 py-6 md:px-10 md:py-10">
        <LegalDocumentIntro>
          묵향인쇄는 이용자의 개인정보를 중요하게 생각하며, 개인정보 보호 관련 법령을
          준수합니다. 본 개인정보처리방침은 묵향인쇄 홈페이지에서 수집하는 개인정보의
          항목, 이용 목적, 보유 기간 및 이용자의 권리를 안내하기 위한 문서입니다.
        </LegalDocumentIntro>

        <LegalDocumentSection title="1. 개인정보의 수집 및 이용 목적">
          <p>묵향인쇄는 다음의 목적을 위하여 개인정보를 수집 및 이용합니다.</p>
          <ul className={listClassName}>
            <li>인쇄물 견적 문의 접수</li>
            <li>고객 상담 및 답변 제공</li>
            <li>제품 제작 관련 요청사항 확인</li>
            <li>문의 내용 확인 및 처리</li>
            <li>서비스 품질 개선</li>
          </ul>
        </LegalDocumentSection>

        <LegalDocumentSection title="2. 수집하는 개인정보 항목">
          <p>
            묵향인쇄는 상담문의 게시판 이용 시 다음과 같은 개인정보를 수집할 수
            있습니다.
          </p>
          <ul className={listClassName}>
            <li>작성자명</li>
            <li>연락처</li>
            <li>이메일</li>
            <li>문의유형</li>
            <li>문의제목</li>
            <li>문의내용</li>
            <li>문의글 비밀번호</li>
          </ul>
        </LegalDocumentSection>

        <LegalDocumentSection title="3. 개인정보의 보유 및 이용 기간">
          <p>
            묵향인쇄는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체
            없이 파기합니다.
          </p>
          <p>
            단, 상담 및 문의 처리 기록은 고객 응대 이력 관리를 위하여 문의 처리 완료
            후 최대 1년간 보관할 수 있습니다.
          </p>
          <p>
            관계 법령에 따라 보존이 필요한 경우에는 해당 법령에서 정한 기간 동안
            보관합니다.
          </p>
        </LegalDocumentSection>

        <LegalDocumentSection title="4. 개인정보의 제3자 제공">
          <p>묵향인쇄는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.</p>
          <p>다만 다음의 경우에는 예외로 합니다.</p>
          <ul className={listClassName}>
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령에 따라 제공이 요구되는 경우</li>
            <li>수사기관 등 관계기관의 적법한 절차에 따른 요청이 있는 경우</li>
          </ul>
        </LegalDocumentSection>

        <LegalDocumentSection title="5. 개인정보 처리 위탁">
          <p>
            묵향인쇄는 원활한 홈페이지 운영을 위하여 필요한 경우 일부 업무를 외부
            서비스에 위탁할 수 있습니다.
          </p>
          <p>
            위탁이 발생하거나 위탁업체가 변경되는 경우 본 개인정보처리방침을 통해
            안내합니다.
          </p>
        </LegalDocumentSection>

        <LegalDocumentSection title="6. 개인정보의 파기 절차 및 방법">
          <p>
            묵향인쇄는 개인정보 보유 기간이 경과하거나 처리 목적이 달성된 경우 지체
            없이 해당 개인정보를 파기합니다.
          </p>
          <p>
            전자적 파일 형태의 개인정보는 복구할 수 없는 방법으로 삭제하며, 종이 문서
            형태의 개인정보는 분쇄 또는 소각합니다.
          </p>
        </LegalDocumentSection>

        <LegalDocumentSection title="7. 이용자의 권리와 행사 방법">
          <p>
            이용자는 언제든지 자신의 개인정보에 대하여 열람, 수정, 삭제를 요청할 수
            있습니다.
          </p>
          <p>
            개인정보와 관련된 요청은 묵향인쇄 문의처를 통해 접수할 수 있으며,
            묵향인쇄는 관련 법령에 따라 지체 없이 조치합니다.
          </p>
        </LegalDocumentSection>

        <LegalDocumentSection title="8. 개인정보 보호를 위한 조치">
          <p>묵향인쇄는 개인정보 보호를 위하여 다음과 같은 조치를 시행합니다.</p>
          <ul className={listClassName}>
            <li>개인정보 접근 권한 최소화</li>
            <li>개인정보 관리 담당자 제한</li>
            <li>비밀번호를 통한 비밀글 보호</li>
            <li>보안 점검 및 관리</li>
            <li>불필요한 개인정보 보관 방지</li>
          </ul>
        </LegalDocumentSection>

        <LegalDocumentSection title="9. 쿠키의 사용">
          <p>
            묵향인쇄 홈페이지는 이용자 편의를 위하여 쿠키를 사용할 수 있습니다.
          </p>
          <p>
            이용자는 웹 브라우저 설정을 통해 쿠키 저장을 거부하거나 삭제할 수
            있습니다.
          </p>
        </LegalDocumentSection>

        <LegalDocumentSection title="10. 개인정보 보호책임자 및 문의처">
          <p>개인정보와 관련된 문의사항은 아래 연락처로 문의해 주시기 바랍니다.</p>
          <ul className={listClassName}>
            <li>업체명: 묵향인쇄</li>
            <li>전화번호: 031-989-0317</li>
            <li>주소: 경기 김포시 통진읍 김포대로 2323</li>
          </ul>
        </LegalDocumentSection>

        <LegalDocumentSection title="부칙">
          <p>본 개인정보처리방침은 게시일로부터 시행합니다.</p>
        </LegalDocumentSection>
      </article>
    </div>
  );
}
