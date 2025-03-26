import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ExpoSelect from './expo-select';
import { statusMap } from '@/api/static/common';

const statuses = Object.values(statusMap);
// const priorities = Object.values(priorityMap);

describe('ExpoSelect Component', () => {
  test('renders with default status is In Progress', () => {
    const { container } = render(
      <ExpoSelect items={statusMap} value="2" onChange={jest.fn()} />
    );

    // Check that the default value is displayed
    expect(screen.getByText('In Progress')).toBeInTheDocument();

    // Check that the icon is displayed correctly
    const iconElement = container.querySelector('svg.lucide.lucide-timer');
    expect(iconElement).toBeInTheDocument();
  });

  // NOTE: a bug in @radix-ui/react-select is causing this test to fail
  test('opens select and displays all options', async () => {
    render(<ExpoSelect items={statusMap} value="0" onChange={jest.fn()} />, {
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

  // NOTE: a bug in @radix-ui/react-select is causing this test to fail

  test('calls onChange with new value when an option is selected', async () => {
    const handleChange = jest.fn();
    render(<ExpoSelect items={statusMap} value="0" onChange={handleChange} />);

    // open select
    const trigger = screen.getByRole('combobox');
    userEvent.click(trigger);

    // click on an option (Done)
    const newOption = await screen.findByText('Done');
    userEvent.click(newOption);

    expect(handleChange).toHaveBeenCalledWith('3');
  });
});
