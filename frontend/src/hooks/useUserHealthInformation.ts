import { PublicKey } from "@solana/web3.js";
import { message } from "antd";
import {
  healthInformationType,
  TimeOfLifeClient,
} from "framework/TimeOfLifeClient";
import { useTimeOfLifeClient } from "framework/TimeOfLifeProvider";
import { useMutation, useQuery } from "react-query";

export const useUserCreate = () => {
  const client = useTimeOfLifeClient();

  return useMutation("userCreate", async (data: healthInformationType) => {
    return client?.createHealthInformation(data);
  });
};

export const useUserUpdate = () => {
  const client = useTimeOfLifeClient();

  return useMutation("userupdate", async (data: healthInformationType) => {
    return client?.updateHealthInformation(data);
  });
};

export const useGetUser = (publicKey?: PublicKey) => {
  const client = useTimeOfLifeClient();

  return useQuery(["getUser"], async () => {
    return client?.getHealthInformation(publicKey);
  });
};
