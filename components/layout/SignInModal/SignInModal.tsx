import Modal from "@/components/shared/Modal";
import { AuthForm } from "@/app/auth-server-action/components/AuthForm";
import OAuthForm from "@/app/auth-server-action/components/OAuthForm";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { Logo } from "@/components/shared/icons/logo";


const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center space-y-3 mt-4 border-b border-gray-200 bg-white px-4 py-6 pt-8 md:px-16">
          <div className="mb-7">
          <Logo />
          </div>
          <AuthForm closeSignInModal={() => setShowSignInModal(false)}/>
        </div>
        <OAuthForm/>
      </div>
    </Modal>
  );
};

export default function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback],
  );
}
