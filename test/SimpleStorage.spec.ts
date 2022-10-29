import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { SimpleStorage } from "../typechain-types";

describe("SimpleStorage", () => {
  async function simpleStorageFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy();

    return { simpleStorage, owner, otherAccount };
  }

  let simpleStorage: SimpleStorage;
  let owner: SignerWithAddress;
  let otherAccount: SignerWithAddress;

  beforeEach(async () => {
    ({ simpleStorage, owner, otherAccount } = await loadFixture(
      simpleStorageFixture
    ));
  });

  describe("Deploy contract", () => {
    it("should set the right owner", async () => {
      expect(await simpleStorage.owner()).to.equal(owner.address);
    });

    it("should have message value as empty", async () => {
      expect(await simpleStorage.getMessage()).to.equal("");
    });
  });

  describe("#setMessage", () => {
    describe("faiure", () => {
      it("should revert when not called by owner", async () => {
        await expect(
          simpleStorage.connect(otherAccount).setMessage("New world")
        ).to.be.revertedWith("Caller is not the owner");
      });

      it("should revert if message is empty", async () => {
        await expect(simpleStorage.setMessage("")).to.be.revertedWith(
          "Message cannot be empty"
        );
      });
    });

    describe("success", () => {
      it("should change the message", async () => {
        const expectedMessage = "New world";
        await simpleStorage.setMessage(expectedMessage);
        expect(await simpleStorage.getMessage()).to.equal(expectedMessage);
      });

      it("should emit MessageChange event", async () => {
        const expectedMessage = "New world";
        await expect(simpleStorage.setMessage(expectedMessage))
          .to.emit(simpleStorage, "MessageChanged")
          .withArgs(expectedMessage);
      });
    });
  });
});
