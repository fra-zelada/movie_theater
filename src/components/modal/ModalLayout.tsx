import { FC, PropsWithChildren, MouseEvent, useEffect } from "react";

interface ModalLayoutProps {
    closeModal: () => void;
}

export const ModalLayout: FC<PropsWithChildren<ModalLayoutProps>> = ({
    children,
    closeModal,
}) => {
    const onClick = () => {
        closeModal();
    };
    const onClickChild = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "scroll";
            // closeModal();
        };
    }, []);

    return (
        <div
            className="  fixed top-0 left-0 z-40 w-screen h-[100%] bg-black bg-opacity-80 flex justify-center items-center"
            onClick={onClick}
        >
            <div onClick={onClickChild} className=" contents ">
                {children}
            </div>
        </div>
    );
};
