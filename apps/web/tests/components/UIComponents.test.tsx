import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button, Modal } from "@rishabh-store/ui";
import { MapPicker } from "../../src/components/MapPicker";

describe("UI Components Test Suite", () => {
  it("should render Button component with click handler", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const btn = screen.getByRole("button", { name: /click me/i });
    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should render Modal component when isOpen is true", () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <div>Modal Content Body</div>
      </Modal>
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content Body")).toBeInTheDocument();
  });

  it("should render MapPicker component and trigger GPS location click", () => {
    const handleSelect = vi.fn();
    render(<MapPicker onLocationSelect={handleSelect} />);

    expect(screen.getByPlaceholderText(/search delivery location/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /gps location/i })).toBeInTheDocument();
  });
});
