import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ExpoSelect from './expo-select';
import { statusMap } from '@/api/common';

const statuses = Object.values(statusMap);
// const priorities = Object.values(priorityMap);

describe('ExpoSelect Component', () => {
  test('renders with default status is In Progress', () => {
    const { container } = render(
      <ExpoSelect items={statuses} value="2" onChange={jest.fn()} />
    );

    // Check that the default value is displayed
    expect(screen.getByText('In Progress')).toBeInTheDocument();

    // Check that the icon is displayed correctly
    const iconElement = container.querySelector('svg.lucide.lucide-timer');
    expect(iconElement).toBeInTheDocument();
  });

  test('opens dropdown and displays all options', async () => {
    render(<ExpoSelect items={statuses} value="0" onChange={jest.fn()} />, {
      container: document.body,
    });

    // Simulate clicking the trigger
    const trigger = screen.getByRole('combobox');
    expect(within(trigger).getByText('Backlog')).toBeInTheDocument();

    await userEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // Expect all options to be visible
    for (const item of statuses) {
      const option = await screen.findByText(item.label);
      expect(option).toBeInTheDocument();
    }
  });

  test('calls onChange with new value when an option is selected', async () => {
    const handleChange = jest.fn();
    render(<ExpoSelect items={statuses} value="0" onChange={handleChange} />);

    // Open dropdown
    const trigger = screen.getByRole('combobox');
    userEvent.click(trigger);

    // Click on an option (for example, Option 3)
    const newOption = await screen.findByText('Done');
    userEvent.click(newOption);

    expect(handleChange).toHaveBeenCalledWith('3');
  });
});
