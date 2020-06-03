import AppError from '@shared/errors/AppError';

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let CreateAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    CreateAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });

  it('should be able do create a new appointment', async () => {
    const appointment = await CreateAppointment.execute({
      date: new Date(),
      provider_id: '12312312312312',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12312312312312');
  });

  it('should not be able do create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 5, 26, 23);

    await CreateAppointment.execute({
      date: appointmentDate,
      provider_id: '12312312312312',
    });

    await expect(
      CreateAppointment.execute({
        date: appointmentDate,
        provider_id: '12312312312312',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
